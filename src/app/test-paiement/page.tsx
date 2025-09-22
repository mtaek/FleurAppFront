'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import CartTestPanel from '@/components/cart/CartTestPanel';
import { 
  CreditCardIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function TestPaiementPage() {
  const { cart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">
      <div className="container-spacing py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-light text-sage-900 mb-2">
            Test du Processus de Paiement
          </h1>
          <p className="text-sage-600">
            Page de démonstration pour tester le flux complet de commande
          </p>
        </div>

        {/* Test Panel */}
        <CartTestPanel />

        {/* Current Cart Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-6 mb-8">
          <h2 className="text-xl font-medium text-sage-900 mb-4 flex items-center">
            <ShoppingCartIcon className="mr-3 h-5 w-5" />
            État Actuel du Panier
          </h2>
          
          {totalItems > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sage-600">{totalItems} article(s)</span>
                <span className="font-semibold text-sage-900">
                  Total: {cart.total.toFixed(2)}€
                </span>
              </div>
              
              <div className="space-y-2">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-sage-700">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="text-sage-900">
                      {(item.product.price * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/paiement"
                className="btn-primary w-full inline-flex items-center justify-center"
              >
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Tester le Paiement
              </Link>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sage-600 mb-4">
                Aucun article dans le panier. Utilisez le panel ci-dessus pour ajouter des produits.
              </p>
              <p className="text-sm text-sage-500">
                Vous devez avoir des articles dans votre panier pour accéder au processus de paiement.
              </p>
            </div>
          )}
        </div>

        {/* Testing Instructions */}
        <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-6 mb-8">
          <h2 className="text-xl font-medium text-sage-900 mb-6 flex items-center">
            <DocumentTextIcon className="mr-3 h-5 w-5" />
            Instructions de Test
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-sage-800 mb-2">1. Ajouter des Produits</h3>
              <p className="text-sage-600 text-sm">
                Utilisez le panel de test ci-dessus pour ajouter des produits au panier.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sage-800 mb-2">2. Accéder au Paiement</h3>
              <p className="text-sage-600 text-sm">
                Cliquez sur "Tester le Paiement" ou allez directement sur{' '}
                <code className="bg-sage-100 px-1 rounded">/paiement</code>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sage-800 mb-2">3. Remplir les Informations</h3>
              <p className="text-sage-600 text-sm mb-2">
                Complétez le formulaire de livraison avec des données de test :
              </p>
              <ul className="text-xs text-sage-500 space-y-1 ml-4">
                <li>• Prénom/Nom : n'importe quoi</li>
                <li>• Email : test@example.com</li>
                <li>• Téléphone : 01 23 45 67 89</li>
                <li>• Adresse : 123 Rue de Test</li>
                <li>• Code postal : 75001</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-sage-800 mb-2">4. Tester le Paiement</h3>
              <p className="text-sage-600 text-sm mb-2">
                Utilisez les cartes de test suivantes :
              </p>
              <div className="bg-sage-50 rounded-lg p-4 space-y-2">
                <div className="text-xs">
                  <strong className="text-green-700">✓ Succès :</strong>{' '}
                  <code>4242 4242 4242 4242</code>
                </div>
                <div className="text-xs">
                  <strong className="text-red-700">✗ Refusée :</strong>{' '}
                  <code>4000 0000 0000 0002</code>
                </div>
                <div className="text-xs">
                  <strong className="text-orange-700">⚠ CVV incorrect :</strong>{' '}
                  <code>4000 0000 0000 0127</code>
                </div>
                <div className="text-xs text-sage-500 mt-2">
                  Date : toute date future (ex: 12/25) • CVV : 123
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sage-800 mb-2">5. Validation</h3>
              <p className="text-sage-600 text-sm">
                Après un paiement réussi, vous serez redirigé vers la page de confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/panier"
            className="bg-white rounded-xl shadow-sm border border-cream-200 p-4 hover:shadow-md transition-shadow text-center"
          >
            <ShoppingCartIcon className="h-6 w-6 text-sage-600 mx-auto mb-2" />
            <div className="font-medium text-sage-900">Voir le Panier</div>
            <div className="text-sm text-sage-600">Page panier complète</div>
          </Link>

          <Link
            href="/paiement"
            className={`rounded-xl shadow-sm border p-4 text-center transition-all ${
              totalItems > 0
                ? 'bg-sage-600 text-white hover:bg-sage-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
            }`}
            {...(totalItems === 0 && { 
              onClick: (e) => {
                e.preventDefault();
                alert('Ajoutez des produits au panier d\'abord');
              }
            })}
          >
            <CreditCardIcon className={`h-6 w-6 mx-auto mb-2 ${
              totalItems > 0 ? 'text-white' : 'text-gray-400'
            }`} />
            <div className="font-medium">Processus Paiement</div>
            <div className="text-sm opacity-80">
              {totalItems > 0 ? 'Prêt à tester' : 'Panier vide'}
            </div>
          </Link>

          <Link
            href="/confirmation?payment_intent=pi_test_demo"
            className="bg-white rounded-xl shadow-sm border border-cream-200 p-4 hover:shadow-md transition-shadow text-center"
          >
            <CheckCircleIcon className="h-6 w-6 text-sage-600 mx-auto mb-2" />
            <div className="font-medium text-sage-900">Page Confirmation</div>
            <div className="text-sm text-sage-600">Aperçu direct</div>
          </Link>
        </div>
      </div>
    </div>
  );
}