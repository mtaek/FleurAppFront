'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    EnvelopeIcon,
    ArrowRightIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface ForgotPasswordForm {
    email: string;
}

export default function ForgotPasswordPage() {
    const [form, setForm] = useState<ForgotPasswordForm>({
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [errors, setErrors] = useState<Partial<ForgotPasswordForm>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        
        // Effacer l'erreur quand l'utilisateur tape
        if (errors[name as keyof ForgotPasswordForm]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<ForgotPasswordForm> = {};

        if (!form.email) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // Simulation d'envoi d'email
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setEmailSent(true);
            toast.success('Email de récupération envoyé !');
        } catch (error) {
            toast.error('Erreur lors de l\'envoi. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendEmail = async () => {
        setIsLoading(true);
        
        try {
            // Simulation de renvoi d'email
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success('Email renvoyé !');
        } catch (error) {
            toast.error('Erreur lors du renvoi.');
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
                        <LockClosedIcon className="w-8 h-8 text-sage-600" />
                    </div>
                    <h1 className="text-2xl font-light text-sage-900 mb-2">
                        Mot de passe oublié
                    </h1>
                    <p className="text-sage-600">
                        {!emailSent 
                            ? "Saisissez votre email pour recevoir un lien de récupération"
                            : "Consultez votre boîte email"
                        }
                    </p>
                </motion.div>

                {/* Formulaire ou Confirmation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white border border-sage-200 p-8 shadow-sm"
                >
                    {!emailSent ? (
                        /* Formulaire de récupération */
                        <form onSubmit={handleSubmit} className="space-y-6">
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

                            <div className="bg-sage-50 border border-sage-200 p-4">
                                <div className="flex items-start gap-3">
                                    <EnvelopeIcon className="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="text-sm font-medium text-sage-900 mb-1">
                                            Comment ça fonctionne ?
                                        </h3>
                                        <ul className="text-xs text-sage-600 space-y-1">
                                            <li>• Saisissez l'email de votre compte</li>
                                            <li>• Vous recevrez un lien sécurisé par email</li>
                                            <li>• Cliquez sur le lien pour créer un nouveau mot de passe</li>
                                            <li>• Le lien expire dans 24 heures</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-sage-600 text-white px-8 py-3 font-light hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:bg-sage-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Envoi en cours...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Envoyer le lien</span>
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        /* Confirmation d'envoi */
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-sage-100 border border-sage-200 mx-auto flex items-center justify-center">
                                <CheckCircleIcon className="w-8 h-8 text-sage-600" />
                            </div>
                            
                            <div>
                                <h2 className="text-lg font-light text-sage-900 mb-3">
                                    Email envoyé !
                                </h2>
                                <p className="text-sage-600 text-sm leading-relaxed mb-4">
                                    Nous avons envoyé un lien de récupération à :<br />
                                    <span className="font-medium text-sage-800">{form.email}</span>
                                </p>
                                <p className="text-sage-500 text-xs">
                                    Vérifiez aussi votre dossier spam si vous ne voyez pas l'email dans votre boîte de réception.
                                </p>
                            </div>

                            <div className="bg-sage-50 border border-sage-200 p-4 text-left">
                                <h3 className="text-sm font-medium text-sage-900 mb-2">
                                    Étapes suivantes :
                                </h3>
                                <ol className="text-xs text-sage-600 space-y-1">
                                    <li>1. Ouvrez l'email reçu</li>
                                    <li>2. Cliquez sur "Réinitialiser mon mot de passe"</li>
                                    <li>3. Créez votre nouveau mot de passe</li>
                                    <li>4. Connectez-vous avec vos nouvelles informations</li>
                                </ol>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleResendEmail}
                                    disabled={isLoading}
                                    className="w-full bg-white text-sage-600 px-6 py-2 border border-sage-300 font-light hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:bg-sage-100 disabled:cursor-not-allowed transition-colors text-sm"
                                >
                                    {isLoading ? 'Renvoi...' : 'Renvoyer l\'email'}
                                </button>
                                
                                <button
                                    onClick={() => {
                                        setEmailSent(false);
                                        setForm({ email: '' });
                                    }}
                                    className="text-sage-600 hover:text-sage-800 text-sm transition-colors"
                                >
                                    Essayer avec un autre email
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="mt-8 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-sage-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-sage-500">ou</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-6 flex flex-col gap-2 text-center text-sm">
                        <Link
                            href="/auth/login"
                            className="text-sage-600 hover:text-sage-800 transition-colors"
                        >
                            Retour à la connexion
                        </Link>
                        <Link
                            href="/auth/register"
                            className="text-sage-600 hover:text-sage-800 transition-colors"
                        >
                            Créer un nouveau compte
                        </Link>
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

                {/* Support */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-6 text-center"
                >
                    <p className="text-sage-500 text-xs">
                        Problème persistant ?{' '}
                        <Link
                            href="/contact"
                            className="text-sage-600 hover:text-sage-800 transition-colors"
                        >
                            Contactez notre support
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}