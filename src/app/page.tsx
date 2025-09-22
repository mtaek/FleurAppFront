'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  TruckIcon,
  HeartIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const categories = [
    {
      id: 'bouquets',
      name: 'Bouquets',
      description: 'Compositions florales artisanales',
      icon: '💐',
      href: '/shop?category=bouquets'
    },
    {
      id: 'vases',
      name: 'Vases',
      description: 'Céramiques et verreries élégantes',
      icon: '🏺',
      href: '/shop?category=vases'
    },
    {
      id: 'plantes',
      name: 'Plantes',
      description: 'Verdure d\'intérieur authentique',
      icon: '🌿',
      href: '/shop?category=plantes'
    }
  ];

  const features = [
    {
      icon: TruckIcon,
      title: 'Livraison soignée',
      description: 'Transport adapté pour préserver la fraîcheur'
    },
    {
      icon: HeartIcon,
      title: 'Sélection artisanale',
      description: 'Chaque création est unique et préparée avec soin'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Qualité garantie',
      description: 'Satisfaction assurée ou reprise gratuite'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-sage-50 border-b border-sage-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-5xl font-light text-sage-900 mb-6 leading-tight">
                L'art floral
                <br />
                <span className="text-sage-600">à votre porte</span>
              </h1>
              <p className="text-lg text-sage-600 mb-8 leading-relaxed max-w-md">
                Découvrez notre sélection de créations florales, vases et plantes d'intérieur. 
                Chaque pièce raconte une histoire unique.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center px-8 py-3 bg-sage-600 text-white font-light hover:bg-sage-700 transition-colors"
                >
                  Découvrir la collection
                  <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  href="/a-propos"
                  className="inline-flex items-center justify-center px-8 py-3 border border-sage-300 text-sage-700 font-light hover:bg-sage-50 transition-colors"
                >
                  Comment ça marche
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-sage-100 relative overflow-hidden">
                <Image
                  src="/assets/images/products/bouquet_salon.jpeg"
                  alt="Bouquet artisanal"
                  fill
                  className="object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              {/* Badge nouveau */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 border border-sage-200">
                <div className="flex items-center gap-2 text-sage-700">
                  <SparklesIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Nouveautés</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-light text-sage-900 mb-4">
              Nos collections
            </h2>
            <p className="text-sage-600 max-w-2xl mx-auto leading-relaxed">
              Chaque catégorie reflète notre passion pour la beauté naturelle et l'artisanat de qualité.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={category.href} className="group block">
                  <div className="bg-sage-50 border border-sage-200 p-8 h-full hover:bg-sage-100 transition-colors">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{category.icon}</div>
                      <h3 className="text-xl font-light text-sage-900 mb-2 group-hover:text-sage-700 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sage-600 text-sm leading-relaxed mb-4">
                        {category.description}
                      </p>
                      <div className="inline-flex items-center text-sage-700 text-sm font-medium group-hover:text-sage-800">
                        Explorer
                        <ArrowRightIcon className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-sage-50 border-t border-sage-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-light text-sage-900 mb-4">
              Notre engagement
            </h2>
            <p className="text-sage-600 max-w-2xl mx-auto leading-relaxed">
              Trois piliers fondamentaux guident chacune de nos créations et services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white border border-sage-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-7 h-7 text-sage-600" />
                </div>
                <h3 className="text-lg font-light text-sage-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sage-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl lg:text-3xl font-light text-sage-900 mb-4">
              Prêt à embellir votre quotidien ?
            </h2>
            <p className="text-sage-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Explorez notre collection et trouvez la création qui vous ressemble. 
              Chaque commande est préparée avec attention pour vous offrir le meilleur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3 bg-sage-600 text-white font-light hover:bg-sage-700 transition-colors"
              >
                Commencer ma sélection
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-sage-300 text-sage-700 font-light hover:bg-sage-50 transition-colors"
              >
                Besoin de conseils ?
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}