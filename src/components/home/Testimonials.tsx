'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    id: 1,
    name: 'Marie Dubois',
    role: 'Cliente fidèle',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    content: 'Service impeccable ! Les fleurs sont toujours fraîches et magnifiques. La livraison est ponctuelle et le personnel très professionnel.',
    rating: 5,
    date: '2024-03-15'
  },
  {
    id: 2,
    name: 'Pierre Martin',
    role: 'Client particulier',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    content: 'J\'ai commandé un bouquet pour l\'anniversaire de ma femme. Le résultat a dépassé mes attentes ! Merci pour ce magnifique travail.',
    rating: 5,
    date: '2024-03-10'
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    role: 'Organisatrice événements',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    content: 'FlowerShop est devenu notre partenaire privilégié pour tous nos événements. Qualité exceptionnelle et créativité au rendez-vous !',
    rating: 5,
    date: '2024-03-08'
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-cream-50">
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
            Témoignages
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-sage-600 max-w-3xl mx-auto font-light leading-relaxed"
          >
            L'émotion partagée de nos clients, témoins de la beauté de nos créations florales
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-500 border border-sage-100"
            >
              {/* Stars */}
              <div className="flex items-center mb-6">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-gold-500" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-sage-700 mb-8 leading-relaxed font-light text-lg italic">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-sage-200">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-light text-sage-900 text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-sage-500 font-light">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
            <div className="text-gray-600">Clients satisfaits</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">5000+</div>
            <div className="text-gray-600">Bouquets livrés</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Note moyenne</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">24h</div>
            <div className="text-gray-600">Livraison rapide</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}