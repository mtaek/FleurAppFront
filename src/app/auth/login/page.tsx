'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    EyeIcon,
    EyeSlashIcon,
    UserIcon,
    LockClosedIcon,
    ArrowRightIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

interface LoginForm {
    email: string;
    password: string;
}

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading: authLoading } = useAuthStore();
    
    const [form, setForm] = useState<LoginForm>({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<LoginForm>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        
        // Effacer l'erreur quand l'utilisateur tape
        if (errors[name as keyof LoginForm]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<LoginForm> = {};

        if (!form.email) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        if (!form.password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (form.password.length < 6) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const success = await login(form.email, form.password);
            
            if (success) {
                toast.success('Connexion réussie !');
                router.push('/');
            } else {
                toast.error('Email ou mot de passe incorrect');
            }
        } catch (error) {
            toast.error('Email ou mot de passe incorrect');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-sage-50 flex items-center justify-center px-6 py-12">
            <div className="max-w-md w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <div className="w-16 h-16 bg-white border border-sage-200 mx-auto mb-6 flex items-center justify-center">
                        <UserIcon className="w-8 h-8 text-sage-600" />
                    </div>
                    <h1 className="text-2xl font-light text-sage-900 mb-2">
                        Connexion
                    </h1>
                    <p className="text-sage-600">
                        Accédez à votre espace personnel
                    </p>
                </motion.div>

                {/* Formulaire */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white border border-sage-200 p-8 shadow-sm"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-sage-700 mb-2">
                                Adresse email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 pr-10 border ${
                                        errors.email 
                                            ? 'border-red-300 focus:border-red-500' 
                                            : 'border-sage-300 focus:border-sage-500'
                                    } text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-1 focus:ring-sage-200 transition-colors`}
                                    placeholder="votre@email.com"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <UserIcon className="w-5 h-5 text-sage-400" />
                                </div>
                            </div>
                            {errors.email && (
                                <div className="mt-2 flex items-center gap-1 text-red-600 text-sm">
                                    <ExclamationTriangleIcon className="w-4 h-4" />
                                    <span>{errors.email}</span>
                                </div>
                            )}
                        </div>

                        {/* Mot de passe */}
                        <div>
                            <label className="block text-sm font-medium text-sage-700 mb-2">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={form.password}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 pr-20 border ${
                                        errors.password 
                                            ? 'border-red-300 focus:border-red-500' 
                                            : 'border-sage-300 focus:border-sage-500'
                                    } text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-1 focus:ring-sage-200 transition-colors`}
                                    placeholder="Votre mot de passe"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-sage-400 hover:text-sage-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                    <LockClosedIcon className="w-5 h-5 text-sage-400" />
                                </div>
                            </div>
                            {errors.password && (
                                <div className="mt-2 flex items-center gap-1 text-red-600 text-sm">
                                    <ExclamationTriangleIcon className="w-4 h-4" />
                                    <span>{errors.password}</span>
                                </div>
                            )}
                        </div>

                        {/* Options */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-sage-600 border-sage-300 focus:ring-sage-500 focus:ring-offset-0"
                                />
                                <span className="ml-2 text-sage-600">Se souvenir de moi</span>
                            </label>
                            <Link
                                href="/auth/forgot-password"
                                className="text-sage-600 hover:text-sage-800 transition-colors"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        {/* Bouton de connexion */}
                        <button
                            type="submit"
                            disabled={isLoading || authLoading}
                            className="w-full bg-sage-600 text-white px-8 py-3 font-light hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:bg-sage-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                        >
                            {(isLoading || authLoading) ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Connexion...</span>
                                </>
                            ) : (
                                <>
                                    <span>Se connecter</span>
                                    <ArrowRightIcon className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-8 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-sage-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-sage-500">ou</span>
                        </div>
                    </div>

                    {/* Lien inscription */}
                    <div className="mt-8 text-center">
                        <p className="text-sage-600 text-sm">
                            Pas encore de compte ?{' '}
                            <Link
                                href="/auth/register"
                                className="text-sage-800 hover:text-sage-900 font-medium transition-colors"
                            >
                                Créer un compte
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Retour à l'accueil */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 text-center"
                >
                    <Link
                        href="/"
                        className="text-sage-600 hover:text-sage-800 text-sm transition-colors"
                    >
                        ← Retour à l'accueil
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}