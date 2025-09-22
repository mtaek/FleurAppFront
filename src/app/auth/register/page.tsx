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
    EnvelopeIcon,
    PhoneIcon,
    ArrowRightIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

interface RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterPage() {
    const router = useRouter();
    const { register, isLoading: authLoading } = useAuthStore();
    
    const [form, setForm] = useState<RegisterForm>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<RegisterForm>>({});
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        
        // Effacer l'erreur quand l'utilisateur tape
        if (errors[name as keyof RegisterForm]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<RegisterForm> = {};

        if (!form.firstName.trim()) {
            newErrors.firstName = 'Le prénom est requis';
        }

        if (!form.lastName.trim()) {
            newErrors.lastName = 'Le nom est requis';
        }

        if (!form.email) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        if (!form.password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (form.password.length < 8) {
            newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword = 'Veuillez confirmer le mot de passe';
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }

        if (form.phone && !/^(\+33|0)[1-9](\d{8})$/.test(form.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Format de téléphone invalide';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0 && acceptTerms;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            if (!acceptTerms) {
                toast.error('Veuillez accepter les conditions d\'utilisation');
            }
            return;
        }

        setIsLoading(true);

        try {
            const success = await register({
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                password: form.password,
                phone: form.phone || undefined
            });
            
            if (success) {
                toast.success('Compte créé avec succès !');
                router.push('/');
            } else {
                toast.error('Erreur lors de la création du compte');
            }
        } catch (error) {
            toast.error('Erreur lors de la création du compte');
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
                        Créer un compte
                    </h1>
                    <p className="text-sage-600">
                        Rejoignez-nous pour une expérience personnalisée
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
                        {/* Prénom et nom */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-sage-700 mb-2">
                                    Prénom *
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border ${
                                        errors.firstName 
                                            ? 'border-red-300 focus:border-red-500' 
                                            : 'border-sage-300 focus:border-sage-500'
                                    } text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-1 focus:ring-sage-200 transition-colors`}
                                    placeholder="Prénom"
                                />
                                {errors.firstName && (
                                    <div className="mt-1 text-red-600 text-xs">
                                        {errors.firstName}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-sage-700 mb-2">
                                    Nom *
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border ${
                                        errors.lastName 
                                            ? 'border-red-300 focus:border-red-500' 
                                            : 'border-sage-300 focus:border-sage-500'
                                    } text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-1 focus:ring-sage-200 transition-colors`}
                                    placeholder="Nom"
                                />
                                {errors.lastName && (
                                    <div className="mt-1 text-red-600 text-xs">
                                        {errors.lastName}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-sage-700 mb-2">
                                Adresse email *
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
                                    <EnvelopeIcon className="w-5 h-5 text-sage-400" />
                                </div>
                            </div>
                            {errors.email && (
                                <div className="mt-2 flex items-center gap-1 text-red-600 text-sm">
                                    <ExclamationTriangleIcon className="w-4 h-4" />
                                    <span>{errors.email}</span>
                                </div>
                            )}
                        </div>

                        {/* Téléphone */}
                        <div>
                            <label className="block text-sm font-medium text-sage-700 mb-2">
                                Téléphone
                            </label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 pr-10 border ${
                                        errors.phone 
                                            ? 'border-red-300 focus:border-red-500' 
                                            : 'border-sage-300 focus:border-sage-500'
                                    } text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-1 focus:ring-sage-200 transition-colors`}
                                    placeholder="06 12 34 56 78"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <PhoneIcon className="w-5 h-5 text-sage-400" />
                                </div>
                            </div>
                            {errors.phone && (
                                <div className="mt-1 text-red-600 text-xs">
                                    {errors.phone}
                                </div>
                            )}
                        </div>

                        {/* Mot de passe */}
                        <div>
                            <label className="block text-sm font-medium text-sage-700 mb-2">
                                Mot de passe *
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
                                    placeholder="Mot de passe (8 caractères min.)"
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
                                <div className="mt-1 text-red-600 text-xs">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        {/* Confirmation mot de passe */}
                        <div>
                            <label className="block text-sm font-medium text-sage-700 mb-2">
                                Confirmer le mot de passe *
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 pr-20 border ${
                                        errors.confirmPassword 
                                            ? 'border-red-300 focus:border-red-500' 
                                            : 'border-sage-300 focus:border-sage-500'
                                    } text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-1 focus:ring-sage-200 transition-colors`}
                                    placeholder="Confirmez votre mot de passe"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-sage-400 hover:text-sage-600 transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeSlashIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                    <LockClosedIcon className="w-5 h-5 text-sage-400" />
                                </div>
                            </div>
                            {errors.confirmPassword && (
                                <div className="mt-1 text-red-600 text-xs">
                                    {errors.confirmPassword}
                                </div>
                            )}
                        </div>

                        {/* Conditions */}
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="w-4 h-4 text-sage-600 border-sage-300 focus:ring-sage-500 focus:ring-offset-0 mt-0.5"
                            />
                            <label htmlFor="acceptTerms" className="text-sm text-sage-600">
                                J'accepte les{' '}
                                <Link href="/conditions" className="text-sage-800 hover:text-sage-900 transition-colors">
                                    conditions d'utilisation
                                </Link>{' '}
                                et la{' '}
                                <Link href="/privacy" className="text-sage-800 hover:text-sage-900 transition-colors">
                                    politique de confidentialité
                                </Link>
                            </label>
                        </div>

                        {/* Bouton d'inscription */}
                        <button
                            type="submit"
                            disabled={isLoading || authLoading}
                            className="w-full bg-sage-600 text-white px-8 py-3 font-light hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:bg-sage-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                        >
                            {(isLoading || authLoading) ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Création...</span>
                                </>
                            ) : (
                                <>
                                    <span>Créer mon compte</span>
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

                    {/* Lien connexion */}
                    <div className="mt-8 text-center">
                        <p className="text-sage-600 text-sm">
                            Déjà un compte ?{' '}
                            <Link
                                href="/auth/login"
                                className="text-sage-800 hover:text-sage-900 font-medium transition-colors"
                            >
                                Se connecter
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