'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/images/products/bouquet_salon.jpeg"
          alt="Composition florale"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/90 via-cream-50/85 to-cream-50/90"></div>
      </div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/3 w-px h-48 bg-sage-300"></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-px bg-sage-300"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-gold-400 rounded-full"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in-up">
            <span className="text-sage-500 text-sm font-light tracking-[0.2em] uppercase">
              Artisan fleuriste parisien
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light text-sage-900 leading-[1.1] mb-8 drop-shadow-sm animate-fade-in-up animation-delay-200">
            L'art floral
            <span className="block text-sage-700 italic font-extralight">
              dans sa plus pure essence
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-sage-700 font-light leading-relaxed max-w-2xl mx-auto mb-12 drop-shadow-sm animate-fade-in-up animation-delay-400">
            Compositions sur mesure, crees avec passion dans notre atelier parisien.
          </p>

          <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center sm:items-center animate-fade-in-up animation-delay-600">
            <Link
              href="/shop"
              className="inline-flex items-center px-8 py-4 bg-sage-800 text-cream-50 font-light rounded-sm hover:bg-sage-900 transition-all duration-300 group"
            >
              Decouvrir nos creations
              <ArrowRightIcon className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center text-sage-700 font-light hover:text-sage-900 transition-colors duration-300 border-b border-transparent hover:border-sage-300"
            >
              Prendre rendez-vous
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-12 mt-16 text-sage-600 text-sm font-light animate-fade-in-up animation-delay-800">
            <div className="text-center">
              <div className="text-sage-800 font-normal mb-1">Livraison</div>
              <div>24h a Paris</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-sage-300"></div>
            <div className="text-center">
              <div className="text-sage-800 font-normal mb-1">Fleurs</div>
              <div>Fraiches quotidiennement</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-sage-300"></div>
            <div className="text-center">
              <div className="text-sage-800 font-normal mb-1">Creation</div>
              <div>Sur mesure</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
