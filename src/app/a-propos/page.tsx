'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    CheckCircleIcon,
    TruckIcon,
    HeartIcon,
    ShieldCheckIcon,
    ClockIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "Dans quelles zones livrez-vous ?",
        answer: "Nous livrons actuellement dans une sélection de villes. Vous pouvez voir les zones disponibles lors de la sélection de votre ville de livraison dans le panier."
    },
    {
        question: "Quels sont vos créneaux de livraison ?",
        answer: "Nos livraisons s'effectuent du lundi au samedi entre 9h00 et 19h00. Vous pouvez choisir votre créneau préféré parmi plusieurs options de 2 heures."
    },
    {
        question: "Comment garantissez-vous la fraîcheur des fleurs ?",
        answer: "Toutes nos compositions sont préparées le jour même de la livraison avec des fleurs fraîches sélectionnées chez nos producteurs partenaires. Nos livreurs sont formés pour maintenir la qualité optimale."
    },
    {
        question: "Puis-je modifier ou annuler ma commande ?",
        answer: "Les modifications sont possibles jusqu'à 2 heures avant le créneau de livraison choisi. Pour toute modification, contactez-nous par téléphone ou email."
    },
    {
        question: "Que se passe-t-il si le destinataire n'est pas présent ?",
        answer: "Notre livreur tentera de vous contacter. Si aucun arrangement n'est possible, la commande sera reportée au lendemain sans frais supplémentaires."
    },
    {
        question: "Proposez-vous des abonnements floraux ?",
        answer: "Oui, nous proposons des abonnements hebdomadaires et mensuels pour recevoir régulièrement de nouvelles créations florales. Contactez-nous pour plus d'informations."
    },
    {
        question: "Les prix incluent-ils la livraison ?",
        answer: "Oui, tous nos prix sont TTC et incluent la livraison dans les zones couvertes. Aucun frais supplémentaire ne sera ajouté à votre commande."
    },
    {
        question: "Comment puis-je joindre le service client ?",
        answer: "Notre équipe est disponible du lundi au vendredi de 9h à 18h par téléphone, email ou via le formulaire de contact de notre site."
    }
];

export default function AProposPage() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const steps = [
        {
            icon: HeartIcon,
            title: "Choisissez votre création",
            description: "Parcourez notre collection de compositions florales artisanales et sélectionnez celle qui vous plaît."
        },
        {
            icon: MapPinIcon,
            title: "Sélectionnez votre zone",
            description: "Indiquez votre ville de livraison parmi nos zones couvertes et choisissez votre créneau préféré."
        },
        {
            icon: ClockIcon,
            title: "Planifiez la livraison",
            description: "Choisissez la date et l'heure qui vous conviennent. Nos créations sont préparées le jour même."
        },
        {
            icon: TruckIcon,
            title: "Recevez vos fleurs",
            description: "Notre équipe livre avec soin votre composition florale fraîche directement à votre adresse."
        }
    ];

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
                            À propos
                        </h1>
                        <p className="text-sage-600 text-lg max-w-2xl mx-auto leading-relaxed">
                            Découvrez comment nous vous apportons la beauté des fleurs fraîches 
                            directement chez vous, avec simplicité et élégance.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
                {/* Comment ça marche Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-light text-sage-900 mb-4">
                            Comment ça marche ?
                        </h2>
                        <p className="text-sage-600 max-w-2xl mx-auto leading-relaxed">
                            Un processus simple et transparent pour vous offrir les plus belles compositions florales.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className="text-center"
                            >
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <step.icon className="w-7 h-7 text-sage-600" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-sage-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="text-base font-medium text-sage-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-sage-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA après les étapes */}
                    <div className="text-center mt-12">
                        <Link
                            href="/shop"
                            className="inline-flex items-center px-8 py-3 bg-sage-600 text-white text-sm font-light hover:bg-sage-700 transition-colors"
                        >
                            Découvrir nos créations
                        </Link>
                    </div>
                </motion.section>

                {/* FAQ Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-light text-sage-900 mb-4">
                            Questions fréquentes
                        </h2>
                        <p className="text-sage-600 max-w-2xl mx-auto leading-relaxed">
                            Retrouvez les réponses aux questions les plus courantes sur nos services et notre processus de livraison.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.05 * index }}
                                className="border border-sage-200 bg-white"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-sage-50 transition-colors"
                                >
                                    <span className="text-sage-900 font-medium pr-4">
                                        {faq.question}
                                    </span>
                                    {openFAQ === index ? (
                                        <ChevronUpIcon className="w-5 h-5 text-sage-500 flex-shrink-0" />
                                    ) : (
                                        <ChevronDownIcon className="w-5 h-5 text-sage-500 flex-shrink-0" />
                                    )}
                                </button>
                                
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: openFAQ === index ? 'auto' : 0,
                                        opacity: openFAQ === index ? 1 : 0
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-4 text-sage-600 leading-relaxed border-t border-sage-100">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <div className="mt-12 text-center bg-sage-50 p-8 border border-sage-200">
                        <div className="flex items-center justify-center mb-4">
                            <ShieldCheckIcon className="w-6 h-6 text-sage-600 mr-2" />
                            <span className="text-sage-900 font-medium">Une autre question ?</span>
                        </div>
                        <p className="text-sage-600 mb-6 leading-relaxed">
                            Notre équipe est à votre disposition pour répondre à toutes vos questions.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-6 py-2 border border-sage-300 text-sage-700 text-sm font-light hover:bg-sage-100 transition-colors"
                        >
                            Nous contacter
                        </Link>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}