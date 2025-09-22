'use client';

import React from 'react';
import ProductCard from '@/components/products/ProductCard';
import { motion } from 'framer-motion';

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Occasion = {
  id: string;
  name: string;
  slug: string;
};

type Review = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
  occasion?: Occasion;
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  rating: number;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
};

export default function FeaturedProducts() {
  // Mock data for development (remove when backend is ready)
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Bouquet de Roses Rouges',
      description: 'Élégant bouquet de 12 roses rouges fraîches, parfait pour exprimer vos sentiments.',
      price: 45.99,
      images: ['https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
      category: { id: '1', name: 'Bouquets', slug: 'bouquets' },
      occasion: { id: '1', name: 'Amour', slug: 'amour' },
      inStock: true,
      stockQuantity: 15,
      featured: true,
      rating: 4.8,
      reviews: [{ id: '1', productId: '1', userId: '1', userName: 'Marie', rating: 5, comment: 'Magnifique !', createdAt: new Date() }],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Arrangement de Lys Blancs',
      description: 'Composition sophistiquée de lys blancs dans un vase élégant.',
      price: 65.99,
      images: ['https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
      category: { id: '2', name: 'Arrangements', slug: 'arrangements' },
      inStock: true,
      stockQuantity: 8,
      featured: true,
      rating: 4.9,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Bouquet Champêtre',
      description: 'Mélange harmonieux de fleurs des champs aux couleurs vives.',
      price: 39.99,
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
      category: { id: '1', name: 'Bouquets', slug: 'bouquets' },
      inStock: true,
      stockQuantity: 12,
      featured: true,
      rating: 4.7,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Orchidée Phalaenopsis',
      description: 'Orchidée violette dans un pot décoratif, parfaite comme plante d\'intérieur.',
      price: 55.99,
      images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
      category: { id: '3', name: 'Plantes', slug: 'plantes' },
      inStock: true,
      stockQuantity: 6,
      featured: true,
      rating: 4.6,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      name: 'Composition Zen',
      description: 'Arrangement moderne avec bambou et fleurs blanches pour une ambiance apaisante.',
      price: 72.99,
      images: ['https://images.unsplash.com/photo-1487070183336-b99083e983d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
      category: { id: '2', name: 'Arrangements', slug: 'arrangements' },
      inStock: true,
      stockQuantity: 4,
      featured: true,
      rating: 4.9,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '6',
      name: 'Bouquet de Pivoines',
      description: 'Sublime bouquet de pivoines roses et blanches, symbole de délicatesse.',
      price: 89.99,
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
      category: { id: '1', name: 'Bouquets', slug: 'bouquets' },
      occasion: { id: '2', name: 'Mariage', slug: 'mariage' },
      inStock: true,
      stockQuantity: 7,
      featured: true,
      rating: 4.8,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '7',
      name: 'Jardin Suspendu',
      description: 'Arrangement de plantes grasses dans un contenant suspendu design.',
      price: 34.99,
      images: ['https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
      category: { id: '3', name: 'Plantes', slug: 'plantes' },
      inStock: true,
      stockQuantity: 10,
      featured: true,
      rating: 4.5,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '8',
      name: 'Élégance Dorée',
      description: 'Bouquet sophistiqué de roses crème et eucalyptus doré pour occasions spéciales.',
      price: 125.99,
      images: ['https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
      category: { id: '1', name: 'Bouquets', slug: 'bouquets' },
      occasion: { id: '3', name: 'Anniversaire', slug: 'anniversaire' },
      inStock: true,
      stockQuantity: 3,
      featured: true,
      rating: 5.0,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const displayProducts: Product[] = mockProducts;

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-cream-50 to-sage-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="text-gold-600 text-sm font-medium tracking-wider uppercase">
              Nos créations phares
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-sage-800 mb-6"
          >
            Sélection 
            <span className="text-gold-600 font-medium"> exclusive</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-sage-600 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Une sélection de nos plus belles créations, pensées avec passion et savoir-faire, 
            pour célébrer la beauté de chaque instant.
          </motion.p>
        </div>

        {/* Products Grid */}
        {displayProducts && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {displayProducts.slice(0, 8).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <motion.a
              href="/shop"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-sage-600 to-sage-700 text-white font-medium rounded-xl hover:from-sage-700 hover:to-sage-800 transition-all duration-300 group shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir tous nos produits
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
            <motion.a
              href="/occasions"
              className="inline-flex items-center px-8 py-4 border-2 border-sage-300 text-sage-700 font-medium rounded-xl hover:border-gold-400 hover:text-gold-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Découvrir nos occasions
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}