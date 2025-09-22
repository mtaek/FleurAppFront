'use client';

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Initialiser Stripe avec la clé publique
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeProviderProps {
  children: React.ReactNode;
}

export default function StripeProvider({ children }: StripeProviderProps) {
  return (
    <Elements 
      stripe={stripePromise}
      options={{
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#4f6752', // sage-600
            colorBackground: '#ffffff',
            colorText: '#1f2937',
            colorDanger: '#dc2626',
            fontFamily: 'Inter, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '0px', // Style sobre comme Bergamotte.fr
          },
          rules: {
            '.Input': {
              border: '1px solid #a7b5a8', // sage-300
              padding: '12px',
              fontSize: '16px',
            },
            '.Input:focus': {
              borderColor: '#4f6752', // sage-600
              boxShadow: '0 0 0 1px #4f6752',
            },
            '.Label': {
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151', // sage-700
              marginBottom: '8px',
            },
          },
        },
        loader: 'auto',
      }}
    >
      {children}
    </Elements>
  );
}