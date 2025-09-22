'use client';

import React, { useState, useEffect } from 'react';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { BillingInfo } from '@/types';
import { useCartStore } from '@/store/cartStore';
import BillingAddressForm from './BillingAddressForm';

interface DeliveryInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  instructions?: string;
}

interface DeliveryFormProps {
  initialData: DeliveryInfo;
  onSubmit: (data: DeliveryInfo & { billingInfo?: BillingInfo; useSameBillingAddress: boolean }) => void;
  className?: string;
}



export default function DeliveryForm({ initialData, onSubmit, className = '' }: DeliveryFormProps) {
  const { selectedVille } = useCartStore();
  
  const [formData, setFormData] = useState<DeliveryInfo>(initialData);
  const [errors, setErrors] = useState<Partial<DeliveryInfo>>({});
  const [useSameBillingAddress, setUseSameBillingAddress] = useState(true);
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    address: initialData.address,
    city: initialData.city,
    postalCode: initialData.postalCode,
    email: initialData.email,
    phone: initialData.phone,
  });

  // Effet pour préremplir ville et code postal depuis la ville sélectionnée
  useEffect(() => {
    if (selectedVille) {
      setFormData(prev => ({
        ...prev,
        city: selectedVille.nom,
        postalCode: selectedVille.codePostal
      }));
      
      // Mettre à jour aussi l'adresse de facturation si c'est la même
      if (useSameBillingAddress) {
        setBillingInfo(prev => ({
          ...prev,
          city: selectedVille.nom,
          postalCode: selectedVille.codePostal
        }));
      }
    }
  }, [selectedVille, useSameBillingAddress]);

  const handleInputChange = (field: keyof DeliveryInfo, value: string | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // If using same billing address, update billing info too
    if (useSameBillingAddress && field in billingInfo) {
      setBillingInfo(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBillingInfoChange = (field: keyof BillingInfo, value: string) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleUseSameBillingAddressChange = (useSame: boolean) => {
    setUseSameBillingAddress(useSame);
    
    if (useSame) {
      // Copy delivery info to billing info
      setBillingInfo({
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        email: formData.email,
        phone: formData.phone,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<DeliveryInfo> = {};

    // Required field validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[0-9\s\-\+\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Format de téléphone invalide';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est requis';
    } else if (!/^[0-9]{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Code postal invalide (5 chiffres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        billingInfo: useSameBillingAddress ? undefined : billingInfo,
        useSameBillingAddress
      });
      toast.success('Informations de livraison sauvegardées');
    } else {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
    }
  };



  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4 flex items-center">
            <UserIcon className="mr-2 h-4 w-4" />
            Informations personnelles
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Prénom *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={`w-full px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:border-gray-400 ${errors.firstName ? 'border-red-300 focus:border-red-500' : ''}`}
                placeholder="Votre prénom"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Nom *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={`w-full px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:border-gray-400 ${errors.lastName ? 'border-red-300 focus:border-red-500' : ''}`}
                placeholder="Votre nom"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4 flex items-center">
            <EnvelopeIcon className="mr-2 h-4 w-4" />
            Contact
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:border-gray-400 ${errors.email ? 'border-red-300 focus:border-red-500' : ''}`}
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Téléphone *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:border-gray-400 ${errors.phone ? 'border-red-300 focus:border-red-500' : ''}`}
                placeholder="01 23 45 67 89"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4 flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            Adresse de livraison
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Adresse complète *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={`w-full px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:border-gray-400 ${errors.address ? 'border-red-300 focus:border-red-500' : ''}`}
                placeholder="123 Rue de la Paix"
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-600">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Code postal *
                  {selectedVille && (
                    <span className="text-green-600 ml-1">(Auto-rempli)</span>
                  )}
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  disabled={!!selectedVille}
                  className={`w-full px-3 py-2 border text-xs focus:outline-none ${
                    selectedVille 
                      ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed' 
                      : `border-gray-200 focus:border-gray-400 ${errors.postalCode ? 'border-red-300 focus:border-red-500' : ''}`
                  }`}
                  placeholder="75001"
                  maxLength={5}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-xs text-red-600">{errors.postalCode}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Ville
                  {selectedVille && (
                    <span className="text-green-600 ml-1">(Auto-rempli)</span>
                  )}
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  disabled={!!selectedVille}
                  className={`w-full px-3 py-2 border text-xs focus:outline-none ${
                    selectedVille 
                      ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'border-gray-200 focus:border-gray-400'
                  }`}
                  placeholder="Paris"
                />
              </div>
            </div>
          </div>
        </div>



        {/* Special Instructions */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Instructions spéciales (optionnel)
          </label>
          <textarea
            value={formData.instructions}
            onChange={(e) => handleInputChange('instructions', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:border-gray-400"
            placeholder="Informations complémentaires pour la livraison (code d'accès, étage, etc.)"
          />
        </div>

        {/* Billing Address Section */}
        <div className="pt-8 border-t border-gray-100">
          <div className="mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useSameBillingAddress}
                onChange={(e) => handleUseSameBillingAddressChange(e.target.checked)}
                className="mr-3 h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                L&apos;adresse de facturation est identique à l&apos;adresse de livraison
              </span>
            </label>
          </div>

          {!useSameBillingAddress && (
            <BillingAddressForm
              billingInfo={billingInfo}
              onBillingInfoChange={handleBillingInfoChange}
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-300"
          >
            Continuer vers le paiement
          </button>
        </div>
      </div>
    </form>
  );
}