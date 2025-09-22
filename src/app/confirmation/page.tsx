'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  CheckCircleIcon,
  CalendarDaysIcon,
  TruckIcon,
  EnvelopeIcon,
  PrinterIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState('');
  
  useEffect(() => {
    // Générer un numéro de commande unique
    const paymentIntent = searchParams?.get('payment_intent') || '';
    const orderNum = `FL${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNum);
  }, [searchParams]);

  const estimatedDelivery = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">
      <div className="container-spacing py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-8">
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl lg:text-4xl font-light text-sage-900 mb-4">
            Commande confirmée !
          </h1>
          
          <p className="text-lg text-sage-600 mb-8">
            Merci pour votre confiance. Votre commande a été prise en compte 
            et sera traitée dans les plus brefs délais.
          </p>

          {/* Order Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-8 mb-8 text-left">
            <h2 className="text-xl font-medium text-sage-900 mb-6 text-center">
              Détails de votre commande
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-sage-100">
                <span className="text-sage-600">Numéro de commande</span>
                <span className="font-semibold text-sage-900">{orderNumber}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-sage-100">
                <span className="text-sage-600">Date de commande</span>
                <span className="font-semibold text-sage-900">
                  {new Date().toLocaleDateString('fr-FR')}
                </span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-sage-100">
                <span className="text-sage-600 flex items-center">
                  <TruckIcon className="h-4 w-4 mr-2" />
                  Livraison estimée
                </span>
                <span className="font-semibold text-sage-900 capitalize">
                  {estimatedDelivery()}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-6">
              <EnvelopeIcon className="h-8 w-8 text-sage-600 mx-auto mb-4" />
              <h3 className="font-medium text-sage-900 mb-2">
                Confirmation par email
              </h3>
              <p className="text-sm text-sage-600">
                Un récapitulatif de votre commande vous sera envoyé par email.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-6">
              <CalendarDaysIcon className="h-8 w-8 text-sage-600 mx-auto mb-4" />
              <h3 className="font-medium text-sage-900 mb-2">
                Suivi de livraison
              </h3>
              <p className="text-sm text-sage-600">
                Vous recevrez un SMS le jour de la livraison avec un créneau précis.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/"
              className="btn-primary inline-flex items-center"
            >
              Retour à l'accueil
            </Link>
            
            <Link
              href="/shop"
              className="btn-secondary inline-flex items-center"
            >
              Continuer mes achats
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-sage-50 rounded-xl p-6">
            <h3 className="font-medium text-sage-900 mb-4">
              Besoin d'aide ?
            </h3>
            <p className="text-sm text-sage-600 mb-4">
              Notre équipe est disponible pour répondre à toutes vos questions 
              concernant votre commande.
            </p>
            <div className="space-y-2 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center text-sage-700 hover:text-sage-900 transition-colors"
              >
                Nous contacter
              </Link>
              <span className="hidden sm:inline text-sage-400">•</span>
              <a
                href="tel:0123456789"
                className="inline-flex items-center text-sage-700 hover:text-sage-900 transition-colors"
              >
                01 23 45 67 89
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Chargement...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}