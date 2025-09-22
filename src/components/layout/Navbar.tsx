'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useIsClient } from '@/hooks/useIsClient';
import { useAuthStore } from '@/store/authStore';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  HeartIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'À propos', href: '/a-propos' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isClient = useIsClient();
  
  const { getTotalItems } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  
  const totalItems = isClient ? getTotalItems() : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-cream-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-sage-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">🌸</span>
              </div>
              <span className="font-serif text-xl sm:text-2xl text-sage-800 font-light">FlowerShop</span>
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="ml-6 xl:ml-10 flex items-baseline space-x-2 xl:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 px-3 xl:px-4 py-2 text-sm font-light transition-all duration-300 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">

            <Link href="/panier" className="relative text-gray-600 hover:text-gray-900 p-2 transition-colors duration-200">
              <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                </motion.span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group hidden sm:block">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-2 transition-colors duration-200">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user?.firstName || 'User'}
                      width={28}
                      height={28}
                      className="rounded-full sm:w-8 sm:h-8"
                    />
                  ) : (
                    <UserIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                  <span className="hidden lg:block text-sm font-light">
                    {user?.firstName}
                  </span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200">
                  <Link href="/compte" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 mx-2">
                    Mon compte
                  </Link>
                  <Link href="/commandes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 mx-2">
                    Mes commandes
                  </Link>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={() => useAuthStore.getState().logout()}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 mx-2"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden sm:inline-flex border border-gray-900 text-gray-900 px-3 lg:px-4 py-2 text-sm font-light hover:bg-gray-900 hover:text-white transition-colors duration-200"
              >
                <span className="hidden lg:inline">Connexion</span>
                <UserIcon className="h-4 w-4 lg:hidden" />
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900 p-2 ml-2"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="lg:hidden bg-white border-t border-gray-200">
              <div className="px-4 pt-4 pb-6 space-y-4">
                
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-3 text-base font-light text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  {!isAuthenticated ? (
                    <Link
                      href="/auth/login"
                      className="block w-full border border-gray-900 text-gray-900 text-center px-4 py-3 font-light hover:bg-gray-900 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Connexion
                    </Link>
                  ) : (
                    <div className="space-y-1">
                      <Link
                        href="/compte"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Mon compte
                      </Link>
                      <Link
                        href="/commandes"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Mes commandes
                      </Link>
                      <button
                        onClick={() => {
                          useAuthStore.getState().logout();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}