'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useIsClient } from '@/hooks/useIsClient';
import { useAuthStore } from '@/store/authStore';
import { BillingInfo, DeliveryInfo } from '@/types';
import {
    PaymentForm,
    OrderSummary,
    DeliveryForm,
    PaymentProgress
} from '@/components/payment';
import {
    ArrowLeftIcon,
    ShieldCheckIcon,
    TruckIcon,
    CreditCardIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';



export default function PaiementPage() {
    const router = useRouter();
    const isClient = useIsClient();
    const { cart, getTotalItems } = useCartStore();
    const { isAuthenticated, user } = useAuthStore();

    const [currentStep, setCurrentStep] = useState(1);
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: '',
        city: 'Paris',
        postalCode: '',
        instructions: ''
    });
    const [billingInfo, setBillingInfo] = useState<BillingInfo | undefined>(undefined);
    const [useSameBillingAddress, setUseSameBillingAddress] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Récupérer les dates de livraison depuis le store
    const { globalDeliveryDate, globalTimeSlot } = useCartStore();

    const totalItems = getTotalItems();

    // Éviter l'erreur d'hydratation en attendant que le client soit chargé
    if (!isClient) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Redirection si panier vide
    if (cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50 flex items-center justify-center">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-md mx-auto"
                    >
                        <CreditCardIcon className="mx-auto h-16 w-16 text-sage-300 mb-6" />
                        <h1 className="text-lg font-medium text-gray-900 mb-4">
                            Panier vide
                        </h1>
                        <p className="text-gray-600 mb-6 text-sm">
                            Votre panier est vide. Ajoutez des produits avant de procéder au paiement.
                        </p>
                        <Link href="/shop" className="inline-block px-4 py-2 border border-gray-900 text-gray-900 text-sm hover:bg-gray-900 hover:text-white transition-colors">
                            Découvrir nos produits
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    const handleDeliverySubmit = (data: DeliveryInfo & { billingInfo?: BillingInfo; useSameBillingAddress: boolean }) => {
        setDeliveryInfo(data);
        setBillingInfo(data.billingInfo);
        setUseSameBillingAddress(data.useSameBillingAddress);
        setCurrentStep(2);
    };

    const handlePaymentSuccess = async (paymentIntentId: string) => {
        setIsProcessing(true);

        try {
            // Simuler l'API de création de commande
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Vider le panier
            useCartStore.getState().clearCart();

            // Redirection vers page de confirmation
            router.push(`/confirmation?payment_intent=${paymentIntentId}`);

            toast.success('Paiement réussi ! Commande confirmée.');
        } catch (error) {
            toast.error('Erreur lors de la finalisation de la commande.');
            setIsProcessing(false);
        }
    };

    const steps = [
        { id: 1, name: 'Livraison', description: 'Adresse et informations' },
        { id: 2, name: 'Paiement', description: 'Méthode de paiement' },
        { id: 3, name: 'Confirmation', description: 'Validation finale' }
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
                <div className="container-spacing py-8">
                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href="/panier"
                            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4"
                        >
                            <ArrowLeftIcon className="mr-2 h-4 w-4" />
                            Retour au panier
                        </Link>

                        <h1 className="text-xl font-medium text-gray-900 mb-2">
                            Finaliser ma commande
                        </h1>

                        <p className="text-gray-600 text-sm">
                            {totalItems} article{totalItems > 1 ? 's' : ''} • Total: {cart.total.toFixed(2)}€
                        </p>
                    </div>

                    {/* Progress Indicator */}
                    <PaymentProgress steps={steps} currentStep={currentStep} className="mb-6" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-6">
                                            <h2 className="text-xl font-medium text-sage-900 mb-6 flex items-center">
                                                <TruckIcon className="mr-3 h-5 w-5" />
                                                Informations de livraison
                                            </h2>
                                            <DeliveryForm
                                                initialData={deliveryInfo}
                                                onSubmit={handleDeliverySubmit}
                                            />
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-6">
                                            <h2 className="text-xl font-medium text-sage-900 mb-6 flex items-center">
                                                <CreditCardIcon className="mr-3 h-5 w-5" />
                                                Paiement sécurisé
                                            </h2>
                                            <PaymentForm
                                                amount={cart.total}
                                                deliveryInfo={deliveryInfo}
                                                onSuccess={handlePaymentSuccess}
                                                isProcessing={isProcessing}
                                            />
                                        </div>

                                        <button
                                            onClick={() => setCurrentStep(1)}
                                            className="text-sage-600 hover:text-sage-800 transition-colors"
                                        >
                                            ← Modifier les informations de livraison
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24">
                                <OrderSummary 
                                    cart={cart}
                                    globalDeliveryDate={globalDeliveryDate}
                                    globalTimeSlot={globalTimeSlot}
                                />

                                {/* Security Info */}
                                <div className="mt-6 bg-white rounded-2xl shadow-sm border border-cream-200 p-6">
                                    <h3 className="font-medium text-sage-900 mb-4 flex items-center">
                                        <ShieldCheckIcon className="mr-2 h-5 w-5 text-green-600" />
                                        Paiement sécurisé
                                    </h3>
                                    <ul className="space-y-2 text-sm text-sage-600">
                                        <li>• Cryptage SSL 256 bits</li>
                                        <li>• Certifié PCI DSS</li>
                                        <li>• Stripe - Leader mondial</li>
                                        <li>• Aucune donnée stockée</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}