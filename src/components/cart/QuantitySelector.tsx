'use client';

import React from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export default function QuantitySelector({ 
  quantity, 
  onQuantityChange, 
  min = 1, 
  max = 99,
  className = ''
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <div className={`flex items-center border border-sage-200 rounded-lg ${className}`}>
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="p-2 hover:bg-sage-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Diminuer la quantité"
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="px-2 py-2 text-center text-sage-900 font-medium min-w-[3rem] border-none focus:ring-0 focus:outline-none bg-transparent"
      />
      
      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="p-2 hover:bg-sage-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Augmenter la quantité"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}