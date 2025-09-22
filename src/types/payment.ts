// Types pour l'intégration avec le backend Spring Boot

export interface CreatePaymentIntentRequest {
  amount: number; // En centimes (pour Stripe)
  currency: string;
  description: string;
  orderId: string;
  paymentMethodId?: string; // ID du PaymentMethod Stripe
  receiptEmail?: string; // Email pour reçu automatique Stripe
  metadata: {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    delivery_address: string;
    delivery_city: string;
    delivery_postal_code: string;
    delivery_instructions: string;
  };
}

export interface CreatePaymentIntentResponse {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  orderId: string;
  metadata: {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    delivery_address: string;
    delivery_city: string;
    delivery_postal_code: string;
    delivery_instructions: string;
    user_email: string | null;
  };
  createdAt: string | null;
}

export interface PaymentError {
  message: string;
  status?: number;
}