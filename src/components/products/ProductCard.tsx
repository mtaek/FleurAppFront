'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types';
import { formatPrice, getImageUrl } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  className?: string;
  showQuickAdd?: boolean;
}

export default function ProductCard({ 
  product, 
  className = '',
  showQuickAdd = true 
}: ProductCardProps) {
  const { addToCart } = useCartStore();
  const [isLiked, setIsLiked] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, 1);
    toast.success(`${product.name} ajouté au panier !`, {
      duration: 3000,
      position: 'bottom-right',
    });
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    
    toast.success(
      isLiked ? 'Retiré des favoris' : 'Ajouté aux favoris',
      { duration: 2000, position: 'bottom-right' }
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i}>
        {i < Math.floor(rating) ? (
          <StarIconSolid className="h-4 w-4 text-yellow-400" />
        ) : (
          <StarIcon className="h-4 w-4 text-gray-300" />
        )}
      </span>
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
    >
      <div className={`card-product group ${className}`}>
      <Link href={`/produits/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={getImageUrl(product.images[0])}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {!product.inStock && (
              <span className="bg-sage-800 text-white text-xs font-light px-4 py-2 rounded-full backdrop-blur-sm">
                Épuisé
              </span>
            )}
            {product.featured && (
              <span className="bg-gold-600 text-white text-xs font-light px-4 py-2 rounded-full backdrop-blur-sm">
                Coup de cœur
              </span>
            )}
          </div>

          {/* Action Buttons - style Bergamotte */}
          <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={handleToggleLike}
                className="bg-white/95 backdrop-blur-md p-3 rounded-full hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {isLiked ? (
                  <HeartIconSolid className="h-5 w-5 text-sage-600" />
                ) : (
                  <HeartIcon className="h-5 w-5 text-sage-600" />
                )}
              </button>
            </motion.div>
            
            {showQuickAdd && product.inStock && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={handleAddToCart}
                  className="bg-sage-700 text-white p-3 rounded-full hover:bg-sage-800 transition-all duration-300 shadow-sm hover:shadow-md"
                  type="button"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                </button>
              </motion.div>
            )}
          </div>

          {/* Quick Add Button (Mobile) */}
          {showQuickAdd && product.inStock && (
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden">
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
              >
                Ajouter au panier
              </button>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6">
          {/* Category */}
          {product.category && (
            <p className="text-xs text-sage-500 font-light tracking-wider mb-2">
              {product.category.name}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-light text-xl font-serif text-sage-900 mb-4 line-clamp-2 group-hover:text-sage-700 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-sage-500 font-light">
                ({product.reviews?.length || 0})
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-sage-600 mb-4 line-clamp-2 font-light leading-relaxed">
            {product.description}
          </p>

          {/* Price and Stock */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-light text-sage-900">
                {formatPrice(product.price)}
              </span>
              {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
                <p className="text-xs text-gold-600 mt-1 font-light">
                  Plus que {product.stockQuantity} en stock
                </p>
              )}
            </div>

            {/* Occasion */}
            {product.occasion && (
              <span className="text-xs bg-sage-100 text-sage-700 px-3 py-1 rounded-full font-light">
                {product.occasion.name}
              </span>
            )}
          </div>
        </div>
      </Link>
      </div>
    </motion.div>
  );
}