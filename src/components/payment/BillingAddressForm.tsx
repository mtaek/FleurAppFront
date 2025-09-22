'use client';

import React from 'react';
import { BillingInfo } from '@/types';

interface BillingAddressFormProps {
  billingInfo: BillingInfo;
  onBillingInfoChange: (field: keyof BillingInfo, value: string) => void;
  errors?: Partial<Record<keyof BillingInfo, string>>;
}

export default function BillingAddressForm({
  billingInfo,
  onBillingInfoChange,
  errors = {}
}: BillingAddressFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-900 mb-4">
        Adresse de facturation
      </h3>

      {/* Nom et Prénom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Prénom *
          </label>
          <input
            type="text"
            value={billingInfo.firstName}
            onChange={(e) => onBillingInfoChange('firstName', e.target.value)}
            className={`w-full px-3 py-2 border text-xs focus:outline-none focus:border-gray-400 ${
              errors.firstName ? 'border-red-300 focus:border-red-500' : 'border-gray-200'
            }`}
            placeholder="Votre prénom"
          />
          {errors.firstName && (
            <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Nom *
          </label>
          <input
            type="text"
            value={billingInfo.lastName}
            onChange={(e) => onBillingInfoChange('lastName', e.target.value)}
            className={`w-full px-3 py-2 border text-xs focus:outline-none focus:border-gray-400 ${
              errors.lastName ? 'border-red-300 focus:border-red-500' : 'border-gray-200'
            }`}
            placeholder="Votre nom"
          />
          {errors.lastName && (
            <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Entreprise (optionnelle) */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Entreprise (optionnel)
        </label>
        <input
          type="text"
          value={billingInfo.company || ''}
          onChange={(e) => onBillingInfoChange('company', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:border-gray-400"
          placeholder="Nom de l'entreprise"
        />
      </div>

      {/* Adresse */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Adresse *
        </label>
        <input
          type="text"
          value={billingInfo.address}
          onChange={(e) => onBillingInfoChange('address', e.target.value)}
          className={`w-full px-3 py-2 border text-xs focus:outline-none focus:border-gray-400 ${
            errors.address ? 'border-red-300 focus:border-red-500' : 'border-gray-200'
          }`}
          placeholder="Numéro et nom de rue"
        />
        {errors.address && (
          <p className="text-xs text-red-600 mt-1">{errors.address}</p>
        )}
      </div>

      {/* Ville et Code postal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Ville *
          </label>
          <input
            type="text"
            value={billingInfo.city}
            onChange={(e) => onBillingInfoChange('city', e.target.value)}
            className={`w-full px-3 py-2 border text-xs focus:outline-none focus:border-gray-400 ${
              errors.city ? 'border-red-300 focus:border-red-500' : 'border-gray-200'
            }`}
            placeholder="Ville"
          />
          {errors.city && (
            <p className="text-xs text-red-600 mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Code postal *
          </label>
          <input
            type="text"
            value={billingInfo.postalCode}
            onChange={(e) => onBillingInfoChange('postalCode', e.target.value)}
            className={`w-full px-3 py-2 border text-xs focus:outline-none focus:border-gray-400 ${
              errors.postalCode ? 'border-red-300 focus:border-red-500' : 'border-gray-200'
            }`}
            placeholder="Code postal"
          />
          {errors.postalCode && (
            <p className="text-xs text-red-600 mt-1">{errors.postalCode}</p>
          )}
        </div>
      </div>

      {/* Email et Téléphone (optionnels pour facturation) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Email (optionnel)
          </label>
          <input
            type="email"
            value={billingInfo.email || ''}
            onChange={(e) => onBillingInfoChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:border-gray-400"
            placeholder="email@exemple.fr"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Téléphone (optionnel)
          </label>
          <input
            type="tel"
            value={billingInfo.phone || ''}
            onChange={(e) => onBillingInfoChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:border-gray-400"
            placeholder="06 12 34 56 78"
          />
        </div>
      </div>
    </div>
  );
}