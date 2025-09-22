'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { apiClient } from '@/lib/api';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Veuillez entrer votre adresse email');
      return;
    }

    setIsLoading(true);

    try {
      await apiClient.subscribeNewsletter(email);
      toast.success('Inscription réussie ! Merci pour votre confiance.');
      setEmail('');
    } catch (error) {
      toast.error('Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-sage-700 via-sage-600 to-sage-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cream-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
              <span className="text-5xl">🌸</span>
            </div>
          </div>

          {/* Content */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-light font-serif text-white mb-8">
            Inspiration Florale
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            Découvrez nos créations exclusives, conseils d'experts et inspirations florales. 
            Une invitation à la beauté, directement dans votre boîte mail.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 font-light"
                required
                disabled={isLoading}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-white text-sage-700 font-light rounded-2xl hover:bg-cream-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Inscription...
                  </span>
                ) : (
                  "S'inscrire"
                )}
              </motion.button>
            </div>
            
            <p className="text-sm text-white/70 mt-4">
              Nous respectons votre vie privée. Désabonnement possible à tout moment.
            </p>
          </form>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: '🎁',
                title: 'Offres exclusives',
                description: 'Profitez de réductions réservées aux abonnés'
              },
              {
                icon: '🌸',
                title: 'Nouveautés',
                description: 'Découvrez nos nouvelles créations en avant-première'
              },
              {
                icon: '💡',
                title: 'Conseils d\'experts',
                description: 'Recevez nos astuces pour entretenir vos fleurs'
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-white/80">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}