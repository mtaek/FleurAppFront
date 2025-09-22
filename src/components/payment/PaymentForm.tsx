'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCardIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { DeliveryInfo } from '@/types';
import { CreatePaymentIntentRequest, CreatePaymentIntentResponse } from '@/types/payment';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { ReceiptService } from '@/services/receiptService';
import { useCartStore } from '@/store/cartStore';

interface PaymentFormProps {
  amount: number;
  deliveryInfo: DeliveryInfo;
  onSuccess: (paymentIntentId: string) => void;
  isProcessing?: boolean;
  className?: string;
}

export default function PaymentForm({
  amount,
  deliveryInfo,
  onSuccess,
  isProcessing = false,
  className = ''
}: PaymentFormProps) {
  console.log('🎯 PaymentForm - Initialisation du composant');
  console.log('📊 Props reçues:', {
    amount,
    deliveryInfo,
    isProcessing,
    className,
    onSuccess: typeof onSuccess
  });

  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { cart } = useCartStore();

  // Logs d'état des hooks Stripe
  console.log('🔌 État Stripe:', {
    stripeLoaded: !!stripe,
    elementsLoaded: !!elements,
    processing,
    isProcessing
  });

  // Logs du panier pour les reçus
  console.log('🛒 Panier pour reçu:', {
    totalItems: cart.items.length,
    cartTotal: cart.total,
    items: cart.items.map(item => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price
    }))
  });

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('\n🚀 === DÉBUT DU PROCESSUS DE PAIEMENT ===');
    console.log('📝 Événement form submit déclenché');
    e.preventDefault();
    
    console.log('🔄 Vérification des états:', {
      processing,
      isProcessing,
      shouldBlock: processing || isProcessing
    });

    if (processing || isProcessing) {
      console.log('⏸️  Processus bloqué - paiement déjà en cours');
      return;
    }

    // Vérifier que Stripe est chargé
    console.log('🔍 Vérification de l\'état Stripe...');
    console.log('Stripe disponible:', !!stripe);
    console.log('Elements disponible:', !!elements);
    
    if (!stripe || !elements) {
      console.error('❌ Stripe non chargé:', { stripe: !!stripe, elements: !!elements });
      toast.error('Stripe n\'est pas encore chargé. Veuillez patienter.');
      return;
    }

    console.log('✅ Stripe et Elements sont prêts');
    console.log('🔄 Passage en mode processing...');
    setProcessing(true);

    try {
      // Étape 1: Créer un PaymentMethod avec les données de la carte
      console.log('\n🎯 === ÉTAPE 1: CRÉATION PAYMENT METHOD ===');
      console.log('🔍 Recherche de l\'élément CardNumber...');
      
      const cardElement = elements.getElement(CardNumberElement);
      console.log('CardNumberElement trouvé:', !!cardElement);
      
      if (!cardElement) {
        console.error('❌ Élément CardNumber non trouvé dans Elements');
        throw new Error('Élément de carte non trouvé');
      }

      console.log('✅ CardNumberElement récupéré avec succès');
      console.log('📋 Préparation des billing_details...');

      const billingDetails = {
        name: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
        email: deliveryInfo.email,
        phone: deliveryInfo.phone,
        address: {
          line1: deliveryInfo.address,
          city: deliveryInfo.city,
          postal_code: deliveryInfo.postalCode,
        },
      };

      console.log('📋 Billing details préparés:', billingDetails);
      console.log('🔄 Appel stripe.createPaymentMethod...');

      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      });

      console.log('📊 Résultat createPaymentMethod:', {
        hasError: !!paymentMethodError,
        hasPaymentMethod: !!paymentMethod,
        paymentMethodType: paymentMethod?.type,
        paymentMethodId: paymentMethod?.id
      });

      if (paymentMethodError) {
        console.error('❌ Erreur PaymentMethod:', paymentMethodError);
        console.error('❌ Code d\'erreur:', paymentMethodError.code);
        console.error('❌ Message d\'erreur:', paymentMethodError.message);
        throw new Error(paymentMethodError.message);
      }
    
      console.log('✅ PaymentMethod créé avec succès!');
      console.log('🔑 PaymentMethod ID:', paymentMethod.id);
      console.log('💳 PaymentMethod type:', paymentMethod.type);
      console.log('👤 PaymentMethod billing_details:', paymentMethod.billing_details);

      // Étape 2: Appeler votre API Spring Boot backend avec le PaymentMethod
      console.log('\n🎯 === ÉTAPE 2: CRÉATION PAYMENT INTENT ===');
      console.log('💰 Montant reçu (cart.total en euros):', amount);
      console.log('💰 Type du montant:', typeof amount);
      console.log('🔄 Conversion: 60€ → 6000 centimes (pour Stripe)');
      
      const apiUrl = 'http://localhost:8080/api/v1/payment';
      console.log('🌐 URL du backend:', apiUrl);
      
      // Vérification du montant minimum Stripe (0.50€)
      console.log('🔍 Vérification montant minimum Stripe...');
      if (amount < 0.50) {
        console.error('❌ Montant trop petit:', amount, '€ < 0.50€');
        throw new Error(`Montant trop petit: ${amount}€. Minimum requis: 0.50€`);
      }
      console.log('✅ Montant valide:', amount, '€ >= 0.50€');
      
      // Génération de l'ID de commande
      const orderId = `ORDER_${Date.now()}`;
      console.log('🆔 ID de commande généré:', orderId);
      
      // Préparer les données selon votre CreatePaymentIntentRequest (avec PaymentMethod)
      console.log('📦 Préparation de la requête...');
      console.log('📧 Email pour receiptEmail:', deliveryInfo.email);
      console.log('📧 Type de l\'email:', typeof deliveryInfo.email);
      console.log('📧 Email valide:', !!deliveryInfo.email && deliveryInfo.email.includes('@'));
      
      const requestData: CreatePaymentIntentRequest = {
        amount: amount,
        currency: "eur",
        description: `Commande fleurs - ${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
        orderId: orderId,
        paymentMethodId: paymentMethod.id, // Ajouter l'ID du PaymentMethod
        receiptEmail: deliveryInfo.email, // Email pour reçu Stripe automatique
        metadata: {
          customer_name: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
          customer_email: deliveryInfo.email,
          customer_phone: deliveryInfo.phone,
          delivery_address: deliveryInfo.address,
          delivery_city: deliveryInfo.city,
          delivery_postal_code: deliveryInfo.postalCode,
          delivery_instructions: deliveryInfo.instructions || ""
        }
      };

      console.log('📋 Données de la requête préparées:');
      console.log('  - amount:', requestData.amount, requestData.currency);
      console.log('  - description:', requestData.description);
      console.log('  - orderId:', requestData.orderId);
      console.log('  - paymentMethodId:', requestData.paymentMethodId);
      console.log('  - receiptEmail:', requestData.receiptEmail);
      console.log('  - metadata:', requestData.metadata);

      const fullUrl = `${apiUrl}/create-payment-intent`;
      console.log('📡 URL complète:', fullUrl);
      
      const headers = { 
        'Content-Type': 'application/json',
        // Ajouter l'authentification si nécessaire
        // 'Authorization': `Bearer ${token}`
      };
      console.log('📋 Headers de la requête:', headers);
      console.log('📦 Body de la requête (JSON):', JSON.stringify(requestData, null, 2));
      
      console.log('🔄 Envoi de la requête HTTP POST...');
      const startTime = performance.now();

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData)
      });

      const endTime = performance.now();
      console.log('⏱️  Temps de réponse:', Math.round(endTime - startTime), 'ms');
      console.log('📊 Statut HTTP:', response.status, response.statusText);
      console.log('📋 Headers de réponse:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        console.error('\n❌ === ERREUR HTTP DÉTECTÉE ===');
        console.error('📊 Statut:', response.status, response.statusText);
        console.error('🌐 URL appelée:', fullUrl);
        console.error('📦 Données envoyées:', requestData);
        
        let errorData = null;
        let errorText = '';
        
        console.log('🔍 Tentative de lecture de la réponse d\'erreur...');
        try {
          const responseText = await response.text();
          console.error('📄 Texte brut de la réponse d\'erreur:', responseText);
          console.error('📏 Longueur de la réponse:', responseText.length, 'caractères');
          
          if (responseText) {
            try {
              errorData = JSON.parse(responseText);
              console.error('📋 Données d\'erreur parsées avec succès:', errorData);
              console.error('📋 Type de l\'erreur:', typeof errorData);
              console.error('📋 Clés disponibles:', Object.keys(errorData));
            } catch (jsonError) {
              console.error('⚠️  Impossible de parser le JSON d\'erreur:', (jsonError as Error).message);
              console.error('📄 Contenu texte brut:', responseText);
              errorText = responseText;
            }
          } else {
            console.error('📄 Réponse vide (pas de contenu)');
          }
        } catch (readError) {
          console.error('💥 Erreur lors de la lecture de la réponse d\'erreur:', readError);
          console.error('💥 Type d\'erreur de lecture:', (readError as Error).constructor.name);
          console.error('💥 Message d\'erreur de lecture:', (readError as Error).message);
        }
        
        const errorMessage = errorData?.message || errorText || `Erreur ${response.status}: ${response.statusText}`;
        console.error('📝 Message d\'erreur final:', errorMessage);
        throw new Error(errorMessage);
      }

      console.log('✅ Réponse HTTP OK - Parsing JSON...');
      const responseData: CreatePaymentIntentResponse = await response.json();
      console.log('\n📋 === RÉPONSE DU BACKEND ===');
      console.log('📊 Type de la réponse:', typeof responseData);
      console.log('📋 Clés de la réponse:', Object.keys(responseData));
      console.log('📋 Réponse complète:', JSON.stringify(responseData, null, 2));
      
      // Vérifier si on a reçu un client_secret
      console.log('🔍 Vérification du client_secret...');
      console.log('  - clientSecret présent:', !!responseData.clientSecret);
      console.log('  - clientSecret type:', typeof responseData.clientSecret);
      console.log('  - clientSecret longueur:', responseData.clientSecret?.length);
      
      if (responseData.clientSecret) {
        console.log('✅ Client secret trouvé - PaymentIntent créé avec succès!');
        console.log('🔑 PaymentIntent ID:', responseData.id);
        console.log('💰 Montant confirmé:', responseData.amount, responseData.currency);
        console.log('📋 Statut PaymentIntent:', responseData.status);
        console.log('📦 ID de commande:', responseData.orderId);
        console.log('📝 Description:', responseData.description);
        console.log('📅 Créé le:', responseData.createdAt);
        console.log('🏷️  Métadonnées:', responseData.metadata);
        
        // Vérifier le statut du PaymentIntent
        console.log('🔍 Vérification du statut PaymentIntent...');
        const expectedStatuses = ['requires_payment_method', 'requires_confirmation'];
        if (!expectedStatuses.includes(responseData.status)) {
          console.warn('⚠️  Statut PaymentIntent inattendu:', responseData.status);
          console.warn('⚠️  Statuts attendus:', expectedStatuses);
        } else {
          console.log('✅ Statut PaymentIntent valide:', responseData.status);
        }
        
        // Étape 3: Confirmer le paiement
        console.log('\n🎯 === ÉTAPE 3: CONFIRMATION DU PAIEMENT ===');
        console.log('� Client Secret pour confirmation:', responseData.clientSecret.substring(0, 20) + '...');
        console.log('💳 PaymentMethod ID pour confirmation:', paymentMethod.id);
        
        const confirmParams = {
          payment_method: paymentMethod.id,
        };
        console.log('📋 Paramètres de confirmation:', confirmParams);
        console.log('🔄 Appel stripe.confirmCardPayment...');
        
        const confirmStartTime = performance.now();
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          responseData.clientSecret,
          confirmParams
        );
        const confirmEndTime = performance.now();
        
        console.log('⏱️  Temps de confirmation:', Math.round(confirmEndTime - confirmStartTime), 'ms');
        console.log('📊 Résultat confirmation:', {
          hasError: !!confirmError,
          hasPaymentIntent: !!paymentIntent,
          paymentIntentStatus: paymentIntent?.status,
          paymentIntentId: paymentIntent?.id
        });

        if (confirmError) {
          console.error('\n❌ === ERREUR DE CONFIRMATION ===');
          console.error('❌ Type d\'erreur:', confirmError.type);
          console.error('❌ Code d\'erreur:', confirmError.code);
          console.error('❌ Message d\'erreur:', confirmError.message);
          console.error('❌ Erreur complète:', confirmError);
          throw new Error(confirmError.message);
        }

        console.log('✅ Confirmation réussie sans erreur!');
        console.log('📊 PaymentIntent final:', {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          created: new Date(paymentIntent.created * 1000).toISOString()
        });

        if (paymentIntent.status === 'succeeded') {
          console.log('🎉 === PAIEMENT RÉUSSI ===');
          console.log('🔑 PaymentIntent ID:', paymentIntent.id);
          console.log('💰 Montant payé:', paymentIntent.amount, paymentIntent.currency);
          console.log('📦 Commande associée:', responseData.orderId);
          console.log('⏰ Paiement confirmé à:', new Date().toISOString());
          
          toast.success(`Paiement réussi! Commande: ${responseData.orderId}`);
          
          // Envoi automatique des reçus (Stripe + Personnalisé)
          console.log('📧 === ENVOI AUTOMATIQUE REÇU STRIPE + FACTURE PERSONNALISÉE ===');
          console.log('📧 Stripe enverra un reçu automatiquement à:', deliveryInfo.email);
          
          // Envoi également de notre reçu personnalisé avec facture
          try {
            const cartItems = cart.items.map(item => ({
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price
            }));

            console.log('🔄 Lancement envoi reçu personnalisé...');
            const receiptResult = await ReceiptService.sendReceiptAndInvoice(
              paymentIntent.id,
              responseData.orderId,
              responseData.amount,
              deliveryInfo,
              cartItems
            );

            if (receiptResult.success) {
              console.log('✅ Reçu personnalisé et facture envoyés avec succès!');
              console.log('📧 Email envoyé à:', receiptResult.receipientEmail);
              console.log('📄 Reçu envoyé:', receiptResult.receiptSent);
              console.log('🧾 Facture envoyée:', receiptResult.invoiceSent);
              
              toast.success(`📧 Reçus envoyés à ${deliveryInfo.email}!`);
            } else {
              console.warn('⚠️ Erreur envoi reçu personnalisé:', receiptResult.error);
              toast.success(`📧 Reçu Stripe envoyé à ${deliveryInfo.email}!`);
            }
          } catch (receiptError) {
            console.error('💥 Erreur critique envoi reçu personnalisé:', receiptError);
            toast.success(`📧 Reçu Stripe envoyé à ${deliveryInfo.email}!`);
          }
          
          console.log('🔄 Appel de la fonction onSuccess avec PaymentIntent ID:', paymentIntent.id);
          onSuccess(paymentIntent.id);
          console.log('✅ Fonction onSuccess appelée avec succès');
        } else {
          console.error('❌ Statut de paiement inattendu:', paymentIntent.status);
          console.error('❌ Statuts de succès attendus: ["succeeded"]');
          console.error('❌ PaymentIntent complet:', paymentIntent);
          throw new Error(`Paiement échoué. Statut: ${paymentIntent.status}`);
        }
      } else {
        console.error('❌ Client secret manquant dans la réponse du backend');
        console.error('❌ Réponse reçue:', responseData);
        throw new Error('Client secret manquant dans la réponse');
      }
    } catch (error) {
      console.error('\n💥 === ERREUR GÉNÉRALE DU PROCESSUS DE PAIEMENT ===');
      console.error('❌ Type d\'erreur:', typeof error);
      console.error('❌ Constructeur de l\'erreur:', (error as Error).constructor.name);
      console.error('❌ Message d\'erreur:', (error as Error).message);
      console.error('❌ Stack trace:', (error as Error).stack);
      console.error('❌ Erreur complète:', error);
      
      // Logs d'état au moment de l'erreur
      console.error('📊 État du composant au moment de l\'erreur:');
      console.error('  - processing:', processing);
      console.error('  - isProcessing:', isProcessing);
      console.error('  - stripe loaded:', !!stripe);
      console.error('  - elements loaded:', !!elements);
      console.error('  - amount:', amount);
      console.error('  - deliveryInfo:', deliveryInfo);
      
      toast.error('Erreur lors du paiement. Veuillez réessayer.');
    } finally {
      console.log('🔄 === BLOC FINALLY - NETTOYAGE ===');
      console.log('🔄 Passage processing de', processing, 'à false');
      setProcessing(false);
      console.log('✅ Processing mis à false - composant prêt pour nouvelle tentative');
    }
  };

  console.log('🎨 PaymentForm - Rendu du composant');
  console.log('🎨 État actuel pour le rendu:', {
    processing,
    isProcessing,
    stripeReady: !!stripe && !!elements,
    amount: `${amount}€`
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border border-gray-200 ${className}`}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 flex items-center">
          <LockClosedIcon className="h-5 w-5 mr-2 text-sage-600" />
          Paiement sécurisé
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Stripe Integration Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex">
            <CheckCircleIcon className="h-5 w-5 text-blue-500 mr-2" />
            <div className="text-sm">
              <p className="font-medium text-blue-800">Intégration Stripe activée</p>
              <p className="text-blue-700 mt-1">
                Ce paiement créera une vraie transaction visible dans votre dashboard Stripe.
              </p>
              <p className="text-blue-600 text-xs mt-1">
                Ajoutez votre STRIPE_SECRET_KEY dans .env.local pour voir les transactions
              </p>
            </div>
          </div>
        </div>

        {/* Vrais champs Stripe */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numéro de carte
            </label>
            <div className="relative border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-sage-500 focus-within:border-transparent">
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#374151',
                      '::placeholder': {
                        color: '#9CA3AF',
                      },
                    },
                  },
                  disabled: processing,
                }}
              />
              <CreditCardIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiration
              </label>
              <div className="border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-sage-500 focus-within:border-transparent">
                <CardExpiryElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#374151',
                        '::placeholder': {
                          color: '#9CA3AF',
                        },
                      },
                    },
                    disabled: processing,
                  }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVC
              </label>
              <div className="border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-sage-500 focus-within:border-transparent">
                <CardCvcElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#374151',
                        '::placeholder': {
                          color: '#9CA3AF',
                        },
                      },
                    },
                    disabled: processing,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="flex items-start">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <div className="text-sm text-gray-600">
              <p className="font-medium">Paiement 100% sécurisé</p>
              <p>Vos données sont chiffrées et protégées par SSL</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={processing || isProcessing}
          className={`
            w-full py-3 px-4 rounded-lg font-medium text-white text-sm
            ${processing || isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-sage-600 hover:bg-sage-700 focus:ring-2 focus:ring-sage-500 focus:ring-offset-2'
            }
            transition-colors duration-200
          `}
        >
          {processing || isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Traitement en cours...
            </div>
          ) : (
            `Payer ${amount.toFixed(2)}€`
          )}
        </button>
      </form>
    </motion.div>
  );
}