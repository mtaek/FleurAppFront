'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useIsClient } from '@/hooks/useIsClient';
import { formatPrice } from '@/lib/utils';
import { 
  CreditCardIcon, 
  TruckIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface CartSummaryProps {
  className?: string;
  showCheckoutButton?: boolean;
  globalDeliveryDate?: string;
}

export default function CartSummary({ 
  className = '',
  showCheckoutButton = true,
  globalDeliveryDate = ''
}: CartSummaryProps) {
  const isClient = useIsClient();
  const { cart, removeCoupon, selectedVille } = useCartStore();

  // Vérifier si la date de livraison globale et la ville sont définies
  const hasDeliveryDate = globalDeliveryDate.length > 0;
  const hasVille = selectedVille !== null;
  const canProceedToPayment = cart.items.length > 0 && hasDeliveryDate && hasVille;

  if (!isClient) {
    return (
      <div className={`bg-white rounded-2xl shadow-sm border border-cream-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-cream-200 p-6 ${className}`}>
      <h2 className="text-xl font-medium text-sage-900 mb-6">
        Résumé de la commande
      </h2>

      {/* Order Summary */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sage-600">
          <span>Sous-total</span>
          <span>{formatPrice(cart.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sage-600">
          <span>Livraison</span>
          <span>Gratuite</span>
        </div>
        {(cart.discountAmount ?? 0) > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Réduction</span>
            <span>-{formatPrice(cart.discountAmount ?? 0)}</span>
          </div>
        )}

        <div className="border-t border-sage-200 pt-3">
          <div className="flex justify-between text-lg font-semibold text-sage-900">
            <span>Total</span>
            <span>{formatPrice(cart.total)}</span>
          </div>
        </div>
      </div>

      {/* Applied Coupon */}
      {cart.couponCode && (
        <div className="mb-6 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-700">
              Code "{cart.couponCode}" appliqué
            </span>
            <button
              onClick={removeCoupon}
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              Retirer
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {showCheckoutButton && (
        <div className="space-y-3 mb-6">
          {canProceedToPayment ? (
            <Link
              href="/paiement"
              className="btn-primary w-full inline-flex items-center justify-center"
            >
              <CreditCardIcon className="mr-2 h-4 w-4" />
              Procéder au paiement
            </Link>
          ) : (
            <div className="space-y-2">
              <button
                disabled
                className="btn-primary w-full inline-flex items-center justify-center opacity-50 cursor-not-allowed"
              >
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Procéder au paiement
              </button>
              {!hasVille && (
                <p className="text-xs text-red-600 text-center">
                  Veuillez sélectionner votre ville de livraison
                </p>
              )}
              {hasVille && !hasDeliveryDate && (
                <p className="text-xs text-red-600 text-center">
                  Veuillez sélectionner une date de livraison pour votre commande
                </p>
              )}
            </div>
          )}
          
          <Link
            href="/shop"
            className="btn-secondary w-full inline-flex items-center justify-center"
          >
            Continuer mes achats
          </Link>
        </div>
      )}

      {/* Additional Info */}
      <div className="space-y-3 text-sm text-sage-600">
        <div className="flex items-center gap-2">
          <TruckIcon className="h-4 w-4" />
          <span>Livraison gratuite</span>
        </div>
        
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="h-4 w-4" />
          <span>Paiement 100% sécurisé</span>
        </div>
        
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4" />
          <span>Livraison en 24h à Paris</span>
        </div>
      </div>
    </div>
  );
}