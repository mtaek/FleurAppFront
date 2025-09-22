'use client';

import React from 'react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { Cart } from '@/types';
import {
    CalendarDaysIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

interface OrderSummaryProps {
    cart: Cart;
    globalDeliveryDate?: string;
    globalTimeSlot?: string;
    className?: string;
}

export default function OrderSummary({ cart, globalDeliveryDate, globalTimeSlot, className = '' }: OrderSummaryProps) {

    const formatDeliveryDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        }).format(date);
    };

    const getTotalItems = () => {
        return cart.items.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <div className={`bg-white border border-gray-200 ${className}`}>
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="text-base font-medium text-gray-900">
                    Résumé de la commande
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    {getTotalItems()} article{getTotalItems() > 1 ? 's' : ''}
                </p>
            </div>

            {/* Delivery Information */}
            {globalDeliveryDate && (
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <div className="space-y-1 text-sm">
                        <div className="flex items-center text-gray-700">
                            <CalendarDaysIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="capitalize">{formatDeliveryDate(globalDeliveryDate)}</span>
                        </div>
                        {globalTimeSlot && (
                            <div className="flex items-center text-gray-700">
                                <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                                <span>{globalTimeSlot}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Cart Items */}
            <div className="px-4 py-3">
                <div className="space-y-3">
                    {cart.items.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 py-2">
                            <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded">
                                <Image
                                    src={item.product.images?.[0] || '/assets/images/products/bouquet_salon.jpeg'}
                                    alt={item.product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 mb-1">
                                    {item.product.name}
                                </h4>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Quantité: {item.quantity}</span>
                                    <span className="font-medium text-gray-900">
                                        {formatPrice(item.product.price * item.quantity)}
                                    </span>
                                </div>
                                {item.specialInstructions && (
                                    <div className="mt-1 text-xs text-gray-600 italic">
                                        Note: {item.specialInstructions}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="px-4 py-3 border-t border-gray-100">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Sous-total</span>
                        <span>{formatPrice(cart.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Livraison</span>
                        <span>Gratuite</span>
                    </div>

                    {(cart.discountAmount ?? 0) > 0 && (
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Réduction</span>
                            <span>-{formatPrice(cart.discountAmount ?? 0)}</span>
                        </div>
                    )}

                    <div className="pt-2 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <span className="text-base font-medium text-gray-900">Total</span>
                            <span className="text-base font-semibold text-gray-900">
                                {formatPrice(cart.total)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}