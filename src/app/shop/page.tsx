'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';
import {
    FunnelIcon,
    XMarkIcon,
    ShoppingCartIcon,
    ChevronDownIcon,
    TagIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

// Types
interface ProductSize {
    id: string;
    name: 'Petit' | 'Moyen' | 'Grand';
    price: number;
    description?: string;
}

interface Product {
    id: string;
    name: string;
    description: string;
    category: 'bouquets' | 'vases' | 'plantes';
    images: string[];
    sizes: ProductSize[];
    isNew?: boolean;
    isPromo?: boolean;
    promoPercent?: number;
    originalPrice?: number;
    inStock: boolean;
    tags?: string[];
}

// Mock data - à remplacer par des données d'API
const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Bouquet Romance',
        description: 'Roses rouges et blanches dans un arrangement élégant',
        category: 'bouquets',
        images: ['/assets/images/products/bouquet_salon.jpeg'],
        sizes: [
            { id: '1-s', name: 'Petit', price: 35.00, description: '12 roses' },
            { id: '1-m', name: 'Moyen', price: 55.00, description: '18 roses' },
            { id: '1-l', name: 'Grand', price: 80.00, description: '24 roses' }
        ],
        isNew: true,
        inStock: true,
        tags: ['romantic', 'classic']
    },
    {
        id: '2',
        name: 'Vase Céramique Moderne',
        description: 'Vase en céramique artisanale aux lignes épurées',
        category: 'vases',
        images: ['/assets/images/products/bouquet_salon.jpeg'],
        sizes: [
            { id: '2-s', name: 'Petit', price: 25.00, description: 'H: 15cm' },
            { id: '2-m', name: 'Moyen', price: 45.00, description: 'H: 25cm' },
            { id: '2-l', name: 'Grand', price: 70.00, description: 'H: 35cm' }
        ],
        inStock: true
    },
    {
        id: '3',
        name: 'Monstera Deliciosa',
        description: 'Plante tropicale aux feuilles découpées',
        category: 'plantes',
        images: ['/assets/images/products/bouquet_salon.jpeg'],
        sizes: [
            { id: '3-s', name: 'Petit', price: 20.00, description: '30cm avec pot' },
            { id: '3-m', name: 'Moyen', price: 35.00, description: '50cm avec pot' },
            { id: '3-l', name: 'Grand', price: 65.00, description: '80cm avec pot' }
        ],
        isPromo: true,
        promoPercent: 15,
        inStock: true,
        tags: ['tropical', 'easy-care']
    },
    {
        id: '4',
        name: 'Bouquet Printanier',
        description: 'Tulipes multicolores et verdure fraîche',
        category: 'bouquets',
        images: ['/assets/images/products/bouquet_salon.jpeg'],
        sizes: [
            { id: '4-s', name: 'Petit', price: 28.00, description: '10 tulipes' },
            { id: '4-m', name: 'Moyen', price: 42.00, description: '15 tulipes' },
            { id: '4-l', name: 'Grand', price: 60.00, description: '20 tulipes' }
        ],
        inStock: true,
        tags: ['seasonal', 'colorful']
    },
    {
        id: '5',
        name: 'Vase Vintage',
        description: 'Vase en verre soufflé style rétro',
        category: 'vases',
        images: ['/assets/images/products/bouquet_salon.jpeg'],
        sizes: [
            { id: '5-s', name: 'Petit', price: 18.00, description: 'H: 12cm' },
            { id: '5-m', name: 'Moyen', price: 32.00, description: 'H: 20cm' },
            { id: '5-l', name: 'Grand', price: 50.00, description: 'H: 30cm' }
        ],
        isPromo: true,
        promoPercent: 20,
        inStock: true
    },
    {
        id: '6',
        name: 'Ficus Lyrata',
        description: 'Figuier lyre aux grandes feuilles brillantes',
        category: 'plantes',
        images: ['/assets/images/products/bouquet_salon.jpeg'],
        sizes: [
            { id: '6-s', name: 'Petit', price: 45.00, description: '40cm avec pot' },
            { id: '6-m', name: 'Moyen', price: 75.00, description: '70cm avec pot' },
            { id: '6-l', name: 'Grand', price: 120.00, description: '120cm avec pot' }
        ],
        isNew: true,
        inStock: true,
        tags: ['statement', 'trendy']
    }
];

const categories = [
    { id: 'bouquets', name: 'Bouquets', icon: '💐' },
    { id: 'vases', name: 'Vases', icon: '🏺' },
    { id: 'plantes', name: 'Plantes', icon: '🌿' }
];

const offerTypes = [
    { id: 'new', name: 'Nouveautés', icon: SparklesIcon },
    { id: 'promo', name: 'Promotions', icon: TagIcon }
];

const sortOptions = [
    { id: 'name-asc', name: 'Nom (A-Z)' },
    { id: 'name-desc', name: 'Nom (Z-A)' },
    { id: 'price-asc', name: 'Prix croissant' },
    { id: 'price-desc', name: 'Prix décroissant' }
];

export default function ShopPage() {
    const { addToCart } = useCartStore();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedOffers, setSelectedOffers] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('name-asc');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: string }>({});

    // Gérer les paramètres d'URL au montage
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        const offersParam = urlParams.get('offers');

        if (categoryParam) {
            setSelectedCategories([categoryParam]);
        }

        if (offersParam) {
            setSelectedOffers([offersParam]);
        }
    }, []);

    // Filtrage et tri des produits
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = mockProducts.filter(product => {
            // Filtre par catégories
            if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
                return false;
            }

            // Filtre par offres
            if (selectedOffers.length > 0) {
                const hasNewFilter = selectedOffers.includes('new');
                const hasPromoFilter = selectedOffers.includes('promo');

                if (hasNewFilter && hasPromoFilter) {
                    return product.isNew || product.isPromo;
                } else if (hasNewFilter) {
                    return product.isNew;
                } else if (hasPromoFilter) {
                    return product.isPromo;
                }
            }

            return true;
        });

        // Tri
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'price-asc':
                    return a.sizes[0].price - b.sizes[0].price;
                case 'price-desc':
                    return b.sizes[0].price - a.sizes[0].price;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [selectedCategories, selectedOffers, sortBy]);

    const handleCategoryToggle = (categoryId: string) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleOfferToggle = (offerId: string) => {
        setSelectedOffers(prev =>
            prev.includes(offerId)
                ? prev.filter(id => id !== offerId)
                : [...prev, offerId]
        );
    };

    const handleSizeSelect = (productId: string, sizeId: string) => {
        setSelectedSizes(prev => ({ ...prev, [productId]: sizeId }));
    };

    const handleAddToCart = (product: Product) => {
        const selectedSizeId = selectedSizes[product.id] || product.sizes[0].id;
        const selectedSize = product.sizes.find(size => size.id === selectedSizeId);

        if (!selectedSize) return;

        const cartProduct = {
            id: `${product.id}-${selectedSizeId}`,
            name: `${product.name} (${selectedSize.name})`,
            description: product.description,
            price: selectedSize.price,
            category: {
                id: product.category,
                name: product.category,
                slug: product.category
            },
            images: product.images,
            inStock: product.inStock,
            stockQuantity: 10, // Mock stock
            createdAt: new Date(),
            updatedAt: new Date()
        };

        addToCart(cartProduct, 1);
        toast.success(`${cartProduct.name} ajouté au panier`);
    };

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedOffers([]);
    };

    const hasActiveFilters = selectedCategories.length > 0 || selectedOffers.length > 0;

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-sage-50 border-b border-sage-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-3xl font-light text-sage-900 mb-4">
                            Notre collection
                        </h1>
                        <p className="text-sage-600 max-w-2xl mx-auto leading-relaxed">
                            Découvrez nos bouquets artisanaux, vases élégants et plantes d'intérieur
                            sélectionnés avec soin pour embellir votre quotidien.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                {/* Barre d'outils et filtres */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar filtres - Desktop */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-sage-50 p-6 border border-sage-200">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-base font-medium text-sage-900">Filtres</h3>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="text-xs text-sage-600 hover:text-sage-800"
                                    >
                                        Effacer tout
                                    </button>
                                )}
                            </div>

                            {/* Catégories */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-sage-700 mb-3 uppercase tracking-wider">
                                    Catégories
                                </h4>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <label key={category.id} className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category.id)}
                                                onChange={() => handleCategoryToggle(category.id)}
                                                className="sr-only"
                                            />
                                            <div className={`w-4 h-4 border-2 mr-3 transition-colors ${selectedCategories.includes(category.id)
                                                    ? 'bg-sage-600 border-sage-600'
                                                    : 'border-sage-300'
                                                }`}>
                                                {selectedCategories.includes(category.id) && (
                                                    <svg className="w-3 h-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="text-sm text-sage-700 mr-2">{category.icon}</span>
                                            <span className="text-sm text-sage-700">{category.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Offres */}
                            <div>
                                <h4 className="text-sm font-medium text-sage-700 mb-3 uppercase tracking-wider">
                                    Offres spéciales
                                </h4>
                                <div className="space-y-2">
                                    {offerTypes.map((offer) => (
                                        <label key={offer.id} className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedOffers.includes(offer.id)}
                                                onChange={() => handleOfferToggle(offer.id)}
                                                className="sr-only"
                                            />
                                            <div className={`w-4 h-4 border-2 mr-3 transition-colors ${selectedOffers.includes(offer.id)
                                                    ? 'bg-sage-600 border-sage-600'
                                                    : 'border-sage-300'
                                                }`}>
                                                {selectedOffers.includes(offer.id) && (
                                                    <svg className="w-3 h-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            <offer.icon className="w-4 h-4 text-sage-600 mr-2" />
                                            <span className="text-sm text-sage-700">{offer.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenu principal */}
                    <div className="flex-1">
                        {/* Barre d'outils mobile + tri */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            {/* Bouton filtres mobile */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden flex items-center px-4 py-2 border border-sage-300 text-sage-700 text-sm hover:bg-sage-50 transition-colors"
                            >
                                <FunnelIcon className="w-4 h-4 mr-2" />
                                Filtres
                                {hasActiveFilters && (
                                    <span className="ml-2 bg-sage-600 text-white text-xs px-2 py-0.5 rounded-full">
                                        {selectedCategories.length + selectedOffers.length}
                                    </span>
                                )}
                            </button>

                            {/* Résultats + tri */}
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <span className="text-sm text-sage-600">
                                    {filteredAndSortedProducts.length} produit{filteredAndSortedProducts.length !== 1 ? 's' : ''}
                                </span>

                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-white border border-sage-300 px-4 py-2 pr-8 text-sm focus:outline-none focus:border-sage-500"
                                    >
                                        {sortOptions.map(option => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sage-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Filtres mobiles */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="lg:hidden bg-sage-50 p-4 border border-sage-200 mb-6"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-medium text-sage-900">Filtres</h3>
                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="p-1 hover:bg-sage-200 rounded"
                                        >
                                            <XMarkIcon className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Contenu des filtres mobile - même que desktop */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-sm font-medium text-sage-700 mb-3">Catégories</h4>
                                            <div className="space-y-2">
                                                {categories.map((category) => (
                                                    <label key={category.id} className="flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedCategories.includes(category.id)}
                                                            onChange={() => handleCategoryToggle(category.id)}
                                                            className="sr-only"
                                                        />
                                                        <div className={`w-4 h-4 border-2 mr-3 transition-colors ${selectedCategories.includes(category.id)
                                                                ? 'bg-sage-600 border-sage-600'
                                                                : 'border-sage-300'
                                                            }`}>
                                                            {selectedCategories.includes(category.id) && (
                                                                <svg className="w-3 h-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className="text-sm text-sage-700 mr-2">{category.icon}</span>
                                                        <span className="text-sm text-sage-700">{category.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-sage-700 mb-3">Offres spéciales</h4>
                                            <div className="space-y-2">
                                                {offerTypes.map((offer) => (
                                                    <label key={offer.id} className="flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedOffers.includes(offer.id)}
                                                            onChange={() => handleOfferToggle(offer.id)}
                                                            className="sr-only"
                                                        />
                                                        <div className={`w-4 h-4 border-2 mr-3 transition-colors ${selectedOffers.includes(offer.id)
                                                                ? 'bg-sage-600 border-sage-600'
                                                                : 'border-sage-300'
                                                            }`}>
                                                            {selectedOffers.includes(offer.id) && (
                                                                <svg className="w-3 h-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <offer.icon className="w-4 h-4 text-sage-600 mr-2" />
                                                        <span className="text-sm text-sage-700">{offer.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearAllFilters}
                                            className="mt-4 text-sm text-sage-600 hover:text-sage-800"
                                        >
                                            Effacer tous les filtres
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Grille de produits */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {filteredAndSortedProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="bg-white border border-sage-200 overflow-hidden hover:shadow-md transition-shadow"
                                    >
                                        {/* Image et badges */}
                                        <div className="relative aspect-square bg-sage-50">
                                            <Image
                                                src={product.images[0] || '/assets/images/products/bouquet_salon.jpeg'}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />

                                            {/* Badges */}
                                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                                                {product.isNew && (
                                                    <span className="bg-sage-600 text-white text-xs px-2 py-1 font-medium">
                                                        Nouveau
                                                    </span>
                                                )}
                                                {product.isPromo && (
                                                    <span className="bg-red-500 text-white text-xs px-2 py-1 font-medium">
                                                        -{product.promoPercent}%
                                                    </span>
                                                )}
                                            </div>


                                        </div>

                                        {/* Contenu */}
                                        <div className="p-4">
                                            <h3 className="font-medium text-sage-900 mb-1">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-sage-600 mb-3 line-clamp-2">
                                                {product.description}
                                            </p>

                                            {/* Sélection de taille */}
                                            <div className="mb-4">
                                                <label className="block text-xs font-medium text-sage-700 mb-2">
                                                    Taille
                                                </label>
                                                <div className="grid grid-cols-3 gap-1">
                                                    {product.sizes.map((size) => (
                                                        <button
                                                            key={size.id}
                                                            onClick={() => handleSizeSelect(product.id, size.id)}
                                                            className={`p-2 text-xs border transition-colors ${selectedSizes[product.id] === size.id || (!selectedSizes[product.id] && size.id === product.sizes[0].id)
                                                                    ? 'bg-sage-600 text-white border-sage-600'
                                                                    : 'border-sage-300 text-sage-700 hover:border-sage-400'
                                                                }`}
                                                        >
                                                            <div className="font-medium">{size.name}</div>
                                                            <div className="opacity-80">{formatPrice(size.price)}</div>
                                                            {size.description && (
                                                                <div className="opacity-70 text-xs mt-0.5">
                                                                    {size.description}
                                                                </div>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Prix et action */}
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    {(() => {
                                                        const selectedSize = selectedSizes[product.id]
                                                            ? product.sizes.find(s => s.id === selectedSizes[product.id])
                                                            : product.sizes[0];
                                                        return (
                                                            <div className="text-lg font-semibold text-sage-900">
                                                                {formatPrice(selectedSize?.price || 0)}
                                                            </div>
                                                        );
                                                    })()}
                                                </div>

                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={!product.inStock}
                                                    className="flex items-center px-4 py-2 bg-sage-600 text-white text-sm hover:bg-sage-700 disabled:bg-sage-300 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <ShoppingCartIcon className="w-4 h-4 mr-1" />
                                                    Ajouter
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Message si aucun produit */}
                        {filteredAndSortedProducts.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-sage-400 mb-4">
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-sage-900 mb-2">
                                    Aucun produit trouvé
                                </h3>
                                <p className="text-sage-600 mb-4">
                                    Essayez de modifier vos filtres pour voir plus de produits.
                                </p>
                                <button
                                    onClick={clearAllFilters}
                                    className="px-6 py-2 border border-sage-300 text-sage-700 hover:bg-sage-50 transition-colors"
                                >
                                    Effacer les filtres
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}