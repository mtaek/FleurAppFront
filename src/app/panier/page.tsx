'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useIsClient } from '@/hooks/useIsClient';
import { formatPrice } from '@/lib/utils';
import QuantitySelector from '@/components/cart/QuantitySelector';
import CartSummary from '@/components/cart/CartSummary';
import CouponCodeInput from '@/components/cart/CouponCodeInput';
import CartTestPanel from '@/components/cart/CartTestPanel';
import {
    TrashIcon,
    ShoppingBagIcon,
    ArrowLeftIcon,
    HeartIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { Ville } from '@/types';
import { villesService } from '@/services/villesService';

export default function PanierPage() {
    const isClient = useIsClient();
    const {
        cart,
        updateQuantity,
        removeFromCart,
        updateDeliveryDate,
        updateSpecialInstructions,
        getTotalItems,
        globalDeliveryDate,
        globalTimeSlot,
        setGlobalDeliveryDate,
        setGlobalTimeSlot,
        selectedVille,
        setSelectedVille
    } = useCartStore();

    const [villes, setVilles] = useState<Ville[]>([]);
    const [loadingVilles, setLoadingVilles] = useState(true);

    const timeSlots = [
        { value: '09:00-11:00', label: '9h00 - 11h00' },
        { value: '10:00-12:00', label: '10h00 - 12h00' },
        { value: '11:00-13:00', label: '11h00 - 13h00' },
        { value: '14:00-16:00', label: '14h00 - 16h00' },
        { value: '15:00-17:00', label: '15h00 - 17h00' },
        { value: '16:00-18:00', label: '16h00 - 18h00' },
        { value: '17:00-19:00', label: '17h00 - 19h00' }
    ];

    // Charger les villes au montage du composant
    useEffect(() => {
        const loadVilles = async () => {
            console.log('=== CHARGEMENT DES VILLES ===');
            setLoadingVilles(true);
            try {
                const villesData = await villesService.getVilles();
                console.log('Villes reçues du service:', villesData);
                
                // Nettoyer les données pour éviter les problèmes de caractères invisibles
                const cleanedVilles = villesData.map(ville => ({
                    ...ville,
                    id: String(ville.id).trim(),
                    nom: ville.nom.trim(),
                    codePostal: ville.codePostal.trim()
                }));
                
                console.log('Villes nettoyées:', cleanedVilles);
                console.log('Détail des IDs:', cleanedVilles.map(v => ({ 
                    id: JSON.stringify(v.id), 
                    length: v.id.length,
                    charCodes: Array.from(v.id).map(char => char.charCodeAt(0))
                })));
                
                setVilles(cleanedVilles);
                console.log('État villes mis à jour');
                toast.success(`${villesData.length} villes disponibles`);
            } catch (error) {
                console.error('Erreur lors du chargement des villes:', error);
                toast.error('Erreur lors du chargement des villes');
            } finally {
                setLoadingVilles(false);
                console.log('=== FIN CHARGEMENT ===');
            }
        };

        loadVilles();
    }, []);

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        updateQuantity(itemId, newQuantity);
    };

    const handleRemoveItem = (itemId: string, productName: string) => {
        removeFromCart(itemId);
        toast.success(`${productName} retiré du panier`);
    };

    const handleGlobalDeliveryDateChange = (date: string) => {
        setGlobalDeliveryDate(date);
        // Appliquer la date à tous les articles du panier
        if (date) {
            cart.items.forEach(item => {
                updateDeliveryDate(item.id, new Date(date));
            });
        }
    };

    const handleGlobalTimeSlotChange = (timeSlot: string) => {
        setGlobalTimeSlot(timeSlot);
    };

    const handleVilleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const villeId = e.target.value.trim(); // Nettoyer les espaces
        console.log('=== DEBUG SELECTION VILLE ===');
        console.log('ID sélectionné (brut):', JSON.stringify(e.target.value));
        console.log('ID sélectionné (nettoyé):', JSON.stringify(villeId));
        console.log('Villes disponibles:', villes);
        console.log('IDs des villes (détail):', villes.map(v => ({ 
            id: JSON.stringify(v.id), 
            length: v.id.length,
            charCodes: Array.from(v.id).map(char => char.charCodeAt(0))
        })));
        
        if (villeId && villeId !== '') {
            const ville = villes.find(v => {
                const cleanVilleId = String(v.id).trim();
                const match = cleanVilleId === villeId;
                console.log(`Comparaison: ${JSON.stringify(cleanVilleId)} === ${JSON.stringify(villeId)} => ${match}`);
                return match;
            });
            console.log('Ville trouvée:', ville);
            
            if (ville) {
                setSelectedVille(ville);
                toast.success(`Ville sélectionnée: ${ville.nom}`);
            } else {
                console.error('Ville non trouvée avec ID:', JSON.stringify(villeId));
                console.error('IDs disponibles:', villes.map(v => JSON.stringify(v.id)));
                toast.error('Erreur lors de la sélection de la ville');
            }
        } else {
            setSelectedVille(null);
            console.log('Ville désélectionnée');
        }
        console.log('=== FIN DEBUG ===');
    };

    const handleInstructionsChange = (itemId: string, instructions: string) => {
        updateSpecialInstructions(itemId, instructions);
    };

    const totalItems = getTotalItems();

    // Éviter l'erreur d'hydratation en attendant que le client soit chargé
    if (!isClient) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="text-center py-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <ShoppingBagIcon className="mx-auto h-16 w-16 text-sage-400 mb-8" />              <h1 className="text-2xl font-light text-sage-900 mb-3">
                                Votre panier est vide
                            </h1>

                            <p className="text-sage-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                                Découvrez notre collection de compositions florales et ajoutez
                                vos créations préférées à votre panier.
                            </p>

                            <div className="flex justify-center">
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center px-6 py-2 border border-sage-300 text-sage-700 text-sm font-light hover:bg-sage-50 transition-colors rounded-sm"
                                >
                                    Découvrir nos créations
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/shop"
                        className="inline-flex items-center text-sage-500 hover:text-sage-700 transition-colors mb-6 text-sm font-light"
                    >
                        <ArrowLeftIcon className="mr-2 h-3 w-3" />
                        Continuer mes achats
                    </Link>

                    <h1 className="text-xl font-light text-sage-900 mb-1">
                        Panier
                    </h1>

                    <p className="text-sage-500 text-sm">
                        {totalItems} article{totalItems > 1 ? 's' : ''}
                    </p>
                </div>

                {/* Test Panel - à supprimer en production */}
                <CartTestPanel />

                {/* Zone de livraison */}
                <div className="mb-8 bg-sage-50 border border-sage-200 p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="mt-1">
                            <svg className="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-base font-light text-sage-900 mb-1">
                                Zone de livraison
                            </h2>
                            <p className="text-xs text-sage-600 leading-relaxed">
                                Nos créations florales sont livrées dans une sélection de villes. 
                                Choisissez votre zone de livraison pour continuer.
                            </p>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <label className="block text-xs font-medium text-sage-700 uppercase tracking-wider">
                            Ville de livraison *
                        </label>
                        
                        <div className="relative">
                            <select
                                value={selectedVille?.id || ''}
                                onChange={handleVilleChange}
                                disabled={loadingVilles || villes.length === 0}
                                className={`w-full px-4 py-3 border text-sm bg-white focus:outline-none transition-all duration-200 appearance-none ${
                                    loadingVilles || villes.length === 0
                                        ? 'border-sage-200 bg-sage-50 text-sage-400 cursor-not-allowed'
                                        : !selectedVille
                                        ? 'border-red-200 focus:border-red-400 focus:ring-1 focus:ring-red-100'
                                        : 'border-sage-300 focus:border-sage-500 focus:ring-1 focus:ring-sage-100'
                                }`}
                            >
                                <option value="">
                                    {loadingVilles 
                                        ? 'Chargement des zones disponibles...' 
                                        : villes.length === 0 
                                        ? 'Aucune ville disponible'
                                        : 'Sélectionner votre ville'
                                    }
                                </option>
                                {villes.length > 0 && villes.map((ville) => (
                                    <option key={ville.id} value={ville.id}>
                                        {ville.nom} - {ville.codePostal}
                                    </option>
                                ))}
                            </select>
                            
                            {/* Icône de sélection custom */}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        
                        {/* État de validation */}
                        {!selectedVille && !loadingVilles && (
                            <div className="flex items-center gap-2 text-red-600">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs">Veuillez sélectionner votre zone de livraison</span>
                            </div>
                        )}
                        
                        {selectedVille && (
                            <div className="flex items-center gap-2 text-sage-600 bg-sage-100 px-3 py-2 text-xs">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>
                                    Livraison confirmée pour <span className="font-medium">{selectedVille.nom}</span> ({selectedVille.codePostal})
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Planification de livraison globale */}
                <div className="mb-8 bg-gray-50 rounded-lg p-6">
                    <h2 className="text-base font-medium text-gray-900 mb-4">
                        Planification de livraison
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-2">
                                Date de livraison *
                            </label>
                            <input
                                type="date"
                                value={globalDeliveryDate}
                                onChange={(e) => handleGlobalDeliveryDateChange(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className={`w-full px-3 py-2 border text-sm focus:outline-none ${!globalDeliveryDate
                                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                                    : 'border-gray-200 focus:border-gray-400'
                                    }`}
                            />
                            {!globalDeliveryDate && (
                                <p className="text-xs text-red-600 mt-1">
                                    Date de livraison requise pour tous vos articles
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-2">
                                Créneau horaire *
                            </label>
                            <select
                                value={globalTimeSlot}
                                onChange={(e) => handleGlobalTimeSlotChange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                            >
                                {timeSlots.map((slot) => (
                                    <option key={slot.value} value={slot.value}>
                                        {slot.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-8">
                        <div className="space-y-4">
                            <AnimatePresence>
                                {cart.items.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="border-b border-sage-100 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0"
                                    >
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {/* Product Image */}
                                            <div className="flex-shrink-0">
                                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden">
                                                    <Image
                                                        src={item.product.images?.[0] || '/assets/images/products/bouquet_salon.jpeg'}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 space-y-4">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900 text-base">
                                                            {item.product.name}
                                                        </h3>
                                                        <p className="text-gray-500 text-xs">
                                                            {String(item.product.category)}
                                                        </p>
                                                        <p className="text-gray-900 font-medium mt-1">
                                                            {formatPrice(item.product.price)}
                                                        </p>
                                                    </div>

                                                    <button
                                                        onClick={() => handleRemoveItem(item.id, item.product.name)}
                                                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                                        title="Supprimer"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-4">
                                                    <QuantitySelector
                                                        quantity={item.quantity}
                                                        onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                                                    />

                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <HeartIcon className="h-3 w-3" />
                                                        <button className="hover:text-gray-700 transition-colors">
                                                            Sauvegarder pour plus tard
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Instructions spéciales */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        Instructions spéciales
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Message, adresse précise..."
                                                        value={item.specialInstructions || ''}
                                                        onChange={(e) => handleInstructionsChange(item.id, e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:border-gray-400"
                                                    />
                                                </div>

                                                {/* Item Total */}
                                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                                    <span className="text-gray-600 text-xs">Sous-total :</span>
                                                    <span className="font-medium text-gray-900 text-sm">
                                                        {formatPrice(item.product.price * item.quantity)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-4">
                            {/* Coupon Code Input */}
                            <div className="bg-white border border-gray-200 p-4">
                                <CouponCodeInput />
                            </div>

                            {/* Cart Summary */}
                            <CartSummary globalDeliveryDate={globalDeliveryDate} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}