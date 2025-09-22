'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { Product, ProductCategory } from '@/types';
import { PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

// Catégories de test
const bouquetsCategory: ProductCategory = {
  id: '1',
  name: 'Bouquets',
  slug: 'bouquets'
};

const arrangementsCategory: ProductCategory = {
  id: '2',
  name: 'Arrangements',
  slug: 'arrangements'
};

const plantsCategory: ProductCategory = {
  id: '3',
  name: 'Plantes',
  slug: 'plantes'
};

// Produits de test
const testProducts: Product[] = [
  {
    id: '1',
    name: 'Bouquet de Roses Rouges',
    description: 'Magnifique bouquet de 12 roses rouges fraîches',
    price: 35.90,
    category: bouquetsCategory,
    images: ['https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    inStock: true,
    stockQuantity: 10,
    rating: 4.8,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Arrangement Champêtre',
    description: 'Composition florale aux couleurs pastel',
    price: 42.50,
    category: arrangementsCategory,
    images: ['https://images.unsplash.com/photo-1487070183336-b99083e983d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    inStock: true,
    stockQuantity: 5,
    rating: 4.9,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Orchidée Phalaenopsis',
    description: 'Orchidée blanche élégante en pot décoratif',
    price: 28.90,
    category: plantsCategory,
    images: ['https://images.unsplash.com/photo-1594736797933-d0d7c6fe7406?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    inStock: true,
    stockQuantity: 8,
    rating: 4.7,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function CartTestPanel() {
  const { addToCart, clearCart, getTotalItems } = useCartStore();

  const handleAddProduct = (product: Product) => {
    addToCart(product, 1, new Date(Date.now() + 24 * 60 * 60 * 1000)); // Livraison demain
    toast.success(`${product.name} ajouté au panier !`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Panier vidé !');
  };

  const totalItems = getTotalItems();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-sage-900">
          Panel de Test - Panier ({totalItems} articles)
        </h2>
        <button
          onClick={handleClearCart}
          className="text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          Vider le panier
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testProducts.map((product) => (
          <div key={product.id} className="border border-sage-200 rounded-lg p-4">
            <h3 className="font-medium text-sage-900 text-sm mb-1">
              {product.name}
            </h3>
            <p className="text-sage-600 text-xs mb-2">
              {product.price.toFixed(2)}€
            </p>
            <button
              onClick={() => handleAddProduct(product)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-sage-100 text-sage-700 rounded-lg hover:bg-sage-200 transition-colors text-sm"
            >
              <PlusIcon className="h-4 w-4" />
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}