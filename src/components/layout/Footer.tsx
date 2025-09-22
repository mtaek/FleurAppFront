'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';

const footerLinks = {
  company: [
    { name: 'À propos', href: '/a-propos' },
    { name: 'Notre équipe', href: '/equipe' },
    { name: 'Nos valeurs', href: '/valeurs' },
    { name: 'Carrières', href: '/carrieres' },
  ],
  products: [
    { name: 'Bouquets', href: '/shop?category=bouquets' },
    { name: 'Vases', href: '/shop?category=vases' },
    { name: 'Plantes', href: '/shop?category=plantes' },
    { name: 'Nouveautés', href: '/shop?offers=new' },
  ],
  occasions: [
    { name: 'Mariage', href: '/occasions/mariage' },
    { name: 'Anniversaire', href: '/occasions/anniversaire' },
    { name: 'Fête des Mères', href: '/occasions/fete-des-meres' },
    { name: 'Saint-Valentin', href: '/occasions/saint-valentin' },
  ],
  support: [
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Livraison', href: '/livraison' },
    { name: 'Retours', href: '/retours' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Politique de confidentialité', href: '/confidentialite' },
    { name: 'CGV', href: '/cgv' },
    { name: 'Cookies', href: '/cookies' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: '#', icon: '📘' },
  { name: 'Instagram', href: '#', icon: '📷' },
  { name: 'Twitter', href: '#', icon: '🐦' },
  { name: 'YouTube', href: '#', icon: '📹' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sage-900 text-cream-100">
      {/* Newsletter Section */}
      <div className="border-b border-sage-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Restez informé de nos nouveautés
            </h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Recevez en avant-première nos nouvelles collections et offres spéciales
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-4 rounded-xl bg-sage-800 border border-sage-700 text-cream-100 placeholder-sage-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 font-light transition-all duration-200"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-xl font-medium hover:from-gold-600 hover:to-gold-700 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-sage-900 transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center">
                <span className="text-sage-900 font-light text-lg">🌸</span>
              </div>
              <span className="font-light font-serif text-2xl">FlowerShop</span>
            </div>
            
            <p className="text-cream-200 mb-8 max-w-md font-light leading-relaxed">
              L'art floral dans toute sa splendeur. Nous créons avec passion des bouquets uniques 
              pour sublimer vos moments précieux.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-gold-400" />
                <span className="text-cream-200">123 Rue des Fleurs, 75001 Paris</span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-gold-400" />
                <span className="text-cream-200">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-gold-400" />
                <span className="text-cream-200">contact@flowershop.fr</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-medium text-cream-100 mb-4">Entreprise</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sage-300 hover:text-gold-400 transition-colors duration-200 font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-cream-100 mb-4">Produits</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sage-300 hover:text-gold-400 transition-colors duration-200 font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-cream-100 mb-4">Occasions</h4>
            <ul className="space-y-2">
              {footerLinks.occasions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sage-300 hover:text-gold-400 transition-colors duration-200 font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-cream-100 mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sage-300 hover:text-gold-400 transition-colors duration-200 font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-sage-300 hover:text-gold-400 transition-colors duration-200 transform hover:scale-110"
                  aria-label={social.name}
                >
                  <span className="text-2xl">{social.icon}</span>
                </a>
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex space-x-4 text-sm">
                {footerLinks.legal.map((link, index) => (
                  <React.Fragment key={link.name}>
                    <Link href={link.href} className="text-sage-400 hover:text-gold-400 transition-colors duration-200 font-light">
                      {link.name}
                    </Link>
                    {index < footerLinks.legal.length - 1 && (
                      <span className="text-sage-600">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-sage-950 border-t border-sage-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-sage-400">
            <div className="flex items-center space-x-1 mb-2 md:mb-0 font-light">
              <span>© {currentYear} Warda Flowers. Fait avec</span>
              <HeartIcon className="h-4 w-4 text-gold-500" />
              <span>à Paris</span>
            </div>
            
            <div className="flex items-center space-x-4 font-light">
              <span>Paiement sécurisé</span>
              <div className="flex space-x-2">
                <span className="text-lg">💳</span>
                <span className="text-lg">🅿️</span>
                <span className="text-lg">🍎</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}