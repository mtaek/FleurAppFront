'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { DeliveryForm, OrderSummary, PaymentProgress, PaymentForm } from '@/components/payment';
import { DeliveryInfo, BillingInfo, PaymentFormData } from '@/types';
import { 
  CheckCircleIcon, 
  ShoppingBagIcon,
  ArrowLeftIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import toast from 'react-hot-toast';

type CheckoutStep = 'delivery' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('delivery');
  const [isProcessing, setIsProcessing] = useState(false);

  // Définition des étapes pour PaymentProgress
  const steps = [
    { id: 1, name: 'Livraison', description: 'Informations de livraison' },
    { id: 2, name: 'Paiement', description: 'Méthode de paiement' },
    { id: 3, name: 'Confirmation', description: 'Finalisation' }
  ];

  const getCurrentStepNumber = () => {
    switch (currentStep) {
      case 'delivery': return 1;
      case 'payment': return 2;
      case 'confirmation': return 3;
      default: return 1;
    }
  };
  
  const [formData, setFormData] = useState<PaymentFormData>({
    deliveryInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      instructions: ''
    },
    billingInfo: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'France'
    },
    useSameBillingAddress: true
  });

  const [paymentResult, setPaymentResult] = useState<{
    paymentIntentId: string;
    orderId: string;
  } | null>(null);

  // Rediriger si le panier est vide
  React.useEffect(() => {
    if (cart.items.length === 0 && currentStep !== 'confirmation') {
      router.push('/shop');
    }
  }, [cart.items.length, currentStep, router]);

  const handleDeliverySubmit = (deliveryData: DeliveryInfo, billingData?: BillingInfo, useSameBilling: boolean = true) => {
    setFormData({
      deliveryInfo: deliveryData,
      billingInfo: billingData || {
        firstName: deliveryData.firstName,
        lastName: deliveryData.lastName,
        address: deliveryData.address,
        city: deliveryData.city,
        postalCode: deliveryData.postalCode,
        country: 'France'
      },
      useSameBillingAddress: useSameBilling
    });
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setIsProcessing(true);
    
    try {
      // Simuler la création de commande
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderId = `WRD-${Date.now()}`;
      
      setPaymentResult({
        paymentIntentId,
        orderId
      });
      
      // Vider le panier
      clearCart();
      
      // Passer à la confirmation
      setCurrentStep('confirmation');
      
      toast.success('Commande validée avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la validation de la commande');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'delivery':
        return (
          <motion.div
            key="delivery"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DeliveryForm
              onSubmit={handleDeliverySubmit}
              initialData={formData.deliveryInfo}
            />
          </motion.div>
        );

      case 'payment':
        return (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Bouton retour */}
            <button
              onClick={() => setCurrentStep('delivery')}
              className="flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Modifier les informations de livraison</span>
            </button>

            {/* Récapitulatif de livraison */}
            <div className="bg-sage-50 border border-sage-200 p-4">
              <h3 className="text-sm font-medium text-sage-900 mb-2">
                Adresse de livraison
              </h3>
              <div className="text-sm text-sage-700">
                <div>{formData.deliveryInfo.firstName} {formData.deliveryInfo.lastName}</div>
                <div>{formData.deliveryInfo.address}</div>
                <div>{formData.deliveryInfo.postalCode} {formData.deliveryInfo.city}</div>
                <div>{formData.deliveryInfo.phone}</div>
              </div>
            </div>

            {/* Formulaire de paiement */}
            <PaymentForm
              amount={cart.total}
              deliveryInfo={formData.deliveryInfo}
              onSuccess={handlePaymentSuccess}
              isProcessing={isProcessing}
            />
          </motion.div>
        );

      case 'confirmation':
        return (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-green-100 border border-green-200 mx-auto mb-6 flex items-center justify-center">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-light text-sage-900 mb-4">
              Commande confirmée !
            </h1>
            
            <p className="text-sage-600 mb-6 max-w-md mx-auto">
              Votre commande <strong>#{paymentResult?.orderId}</strong> a été validée avec succès. 
              Vous recevrez un email de confirmation sous peu.
            </p>

            <div className="bg-sage-50 border border-sage-200 p-6 max-w-md mx-auto mb-8">
              <h3 className="text-sm font-medium text-sage-900 mb-3">
                Prochaines étapes
              </h3>
              <ul className="text-sm text-sage-600 space-y-2 text-left">
                <li>• Préparation de votre commande</li>
                <li>• Email de confirmation avec numéro de suivi</li>
                <li>• Livraison selon le créneau choisi</li>
                <li>• Notification SMS le jour de la livraison</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-6 py-3 bg-sage-600 text-white font-medium hover:bg-sage-700 transition-colors"
              >
                <ShoppingBagIcon className="w-4 h-4 mr-2" />
                Continuer mes achats
              </Link>
              <Link
                href="/orders"
                className="inline-flex items-center justify-center px-6 py-3 border border-sage-300 text-sage-700 font-medium hover:bg-sage-50 transition-colors"
              >
                Suivre ma commande
              </Link>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (cart.items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBagIcon className="w-16 h-16 text-sage-400 mx-auto mb-4" />
          <h1 className="text-xl font-light text-sage-900 mb-2">
            Votre panier est vide
          </h1>
          <p className="text-sage-600 mb-6">
            Découvrez notre collection de créations florales
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-6 py-3 bg-sage-600 text-white font-medium hover:bg-sage-700 transition-colors"
          >
            Voir la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sage-50">
      {/* En-tête */}
      <div className="bg-white border-b border-sage-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-light text-sage-900 mb-6">
            Finaliser ma commande
          </h1>
          
          {/* Barre de progression */}
          <PaymentProgress steps={steps} currentStep={getCurrentStepNumber()} />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire principal */}
          <div className="lg:col-span-2">
            {renderStep()}
          </div>

          {/* Récapitulatif commande */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary 
                cart={cart}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}