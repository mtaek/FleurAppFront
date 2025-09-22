'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { TagIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface CouponCodeInputProps {
  className?: string;
}

export default function CouponCodeInput({ className = '' }: CouponCodeInputProps) {
  const { applyCoupon } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!couponCode.trim()) {
      toast.error('Veuillez saisir un code promo');
      return;
    }

    setIsApplying(true);
    
    try {
      const success = await applyCoupon(couponCode.trim());
      
      if (success) {
        toast.success('Code promo appliqué !');
        setCouponCode('');
      } else {
        toast.error('Code promo invalide');
      }
    } catch (error) {
      toast.error('Une erreur est survenue');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <form onSubmit={handleApplyCoupon} className={className}>
      <label className="block text-xs font-medium text-gray-600 mb-2">
        Code promo
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Entrez votre code"
            className="w-full px-3 py-2 pl-8 border border-gray-200 text-xs focus:outline-none focus:border-gray-400"
            disabled={isApplying}
            maxLength={20}
          />
        </div>
        <button
          type="submit"
          disabled={isApplying || !couponCode.trim()}
          className="px-3 py-2 border border-gray-900 text-gray-900 text-xs hover:bg-gray-900 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isApplying ? 'Application...' : 'Appliquer'}
        </button>
      </div>
    </form>
  );
}