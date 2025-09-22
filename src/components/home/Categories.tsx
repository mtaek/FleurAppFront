'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'bouquets',
    name: 'Bouquets Précieux',
    description: 'L\'art floral à l\'état pur',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    href: '/shop?category=bouquets',
    color: 'from-sage-600 to-sage-800'
  },
  {
    id: 'arrangements',
    name: 'Compositions Raffinées',
    description: 'Des créations d\'exception',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    href: '/shop?category=vases',
    color: 'from-sage-700 to-sage-900'
  },
  {
    id: 'plantes',
    name: 'Jardins Intérieurs',
    description: 'Sérénité et naturalité',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    href: '/shop?category=plantes',
    color: 'from-sage-500 to-sage-700'
  },
  {
    id: 'mariage',
    name: 'Unions Éternelles',
    description: 'Célébrez l\'amour en beauté',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    href: '/occasions/mariage',
    color: 'from-gold-500 to-gold-700'
  }
];

export default function Categories() {
  return (
    <section className="section-padding bergamotte-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-6xl font-light font-serif text-sage-900 mb-6"
          >
            Collections
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-sage-600 max-w-4xl mx-auto font-light leading-relaxed"
          >
            L'art floral dans toute sa splendeur. Des créations pensées pour sublimer chaque instant de votre vie,
            composées avec passion et savoir-faire.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <Link href={category.href}>
                <div className="relative h-96 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
                  {/* Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay - style Bergamotte plus subtil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sage-900/80 via-sage-900/20 to-transparent group-hover:from-sage-900/90 transition-all duration-500"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <motion.h3
                      className="text-2xl font-light font-serif mb-3 group-hover:text-cream-100 transition-colors duration-300"
                    >
                      {category.name}
                    </motion.h3>
                    <p className="text-white/80 group-hover:text-white transition-colors duration-300 font-light">
                      {category.description}
                    </p>
                    
                    {/* Arrow - style Bergamotte */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="inline-flex items-center text-sm font-light bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                        Découvrir
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors duration-200 group"
          >
            Voir tous nos produits
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}