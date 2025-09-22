'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    ClockIcon,
    PaperAirplaneIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface ContactForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export default function ContactPage() {
    const [form, setForm] = useState<ContactForm>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const contactInfo = [
        {
            icon: PhoneIcon,
            title: 'Téléphone',
            content: '+33 1 23 45 67 89',
            description: 'Du lundi au vendredi, 9h-18h'
        },
        {
            icon: EnvelopeIcon,
            title: 'Email',
            content: 'contact@warda-flowers.fr',
            description: 'Réponse sous 24h ouvrées'
        },
        {
            icon: MapPinIcon,
            title: 'Adresse',
            content: '12 Rue des Fleurs, 75001 Paris',
            description: 'Showroom sur rendez-vous'
        },
        {
            icon: ClockIcon,
            title: 'Horaires',
            content: 'Lun-Sam 9h-19h',
            description: 'Dimanche sur demande'
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulation d'envoi
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            toast.success('Message envoyé avec succès !');
            setForm({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            toast.error('Erreur lors de l\'envoi. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-sage-50 border-b border-sage-200">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl font-light text-sage-900 mb-4">
                            Nous contacter
                        </h1>
                        <p className="text-sage-600 text-lg max-w-2xl mx-auto leading-relaxed">
                            Une question, un conseil personnalisé ou une commande spéciale ? 
                            Notre équipe est à votre écoute pour vous accompagner.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Formulaire de contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="mb-8">
                            <h2 className="text-2xl font-light text-sage-900 mb-4">
                                Envoyez-nous un message
                            </h2>
                            <p className="text-sage-600 leading-relaxed">
                                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Nom et prénom */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-sage-700 mb-2">
                                        Prénom *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-sage-300 text-sage-900 placeholder-sage-400 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-200 transition-colors"
                                        placeholder="Votre prénom"
                                    />
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
                                        required
                                        className="w-full px-4 py-3 border border-sage-300 text-sage-900 placeholder-sage-400 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-200 transition-colors"
                                        placeholder="Votre nom"
                                    />
                                </div>
                            </div>

                            {/* Email et téléphone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-sage-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-sage-300 text-sage-900 placeholder-sage-400 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-200 transition-colors"
                                        placeholder="votre@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-sage-700 mb-2">
                                        Téléphone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-sage-300 text-sage-900 placeholder-sage-400 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-200 transition-colors"
                                        placeholder="01 23 45 67 89"
                                    />
                                </div>
                            </div>

                            {/* Sujet */}
                            <div>
                                <label className="block text-sm font-medium text-sage-700 mb-2">
                                    Sujet *
                                </label>
                                <select
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-sage-300 text-sage-900 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-200 transition-colors appearance-none bg-white"
                                >
                                    <option value="">Sélectionnez un sujet</option>
                                    <option value="commande">Question sur une commande</option>
                                    <option value="livraison">Livraison</option>
                                    <option value="produit">Information produit</option>
                                    <option value="personnalise">Commande personnalisée</option>
                                    <option value="autre">Autre</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-sage-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-sage-300 text-sage-900 placeholder-sage-400 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-200 transition-colors resize-none"
                                    placeholder="Décrivez votre demande..."
                                />
                            </div>

                            {/* Bouton d'envoi */}
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
                                        <PaperAirplaneIcon className="w-4 h-4" />
                                        <span>Envoyer le message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Informations de contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-2xl font-light text-sage-900 mb-4">
                                Nos coordonnées
                            </h2>
                            <p className="text-sage-600 leading-relaxed mb-8">
                                Plusieurs moyens pour nous joindre selon vos préférences et l'urgence de votre demande.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    className="bg-sage-50 border border-sage-200 p-6"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white border border-sage-200 flex items-center justify-center flex-shrink-0">
                                            <info.icon className="w-5 h-5 text-sage-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-medium text-sage-900 mb-1">
                                                {info.title}
                                            </h3>
                                            <p className="text-sage-700 font-medium mb-1">
                                                {info.content}
                                            </p>
                                            <p className="text-sm text-sage-600">
                                                {info.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Section engagement */}
                        <div className="mt-12 bg-sage-100 p-6 border border-sage-200">
                            <div className="flex items-start gap-3 mb-4">
                                <CheckCircleIcon className="w-6 h-6 text-sage-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-base font-medium text-sage-900 mb-2">
                                        Notre engagement service
                                    </h3>
                                    <ul className="text-sm text-sage-600 space-y-1">
                                        <li>• Réponse garantie sous 24h ouvrées</li>
                                        <li>• Conseils personnalisés gratuits</li>
                                        <li>• Accompagnement pour vos projets spéciaux</li>
                                        <li>• Suivi de commande en temps réel</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}