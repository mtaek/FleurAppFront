import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe conditionally to avoid build-time errors
const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!secretKey || secretKey === 'sk_test_placeholder_for_build') {
    throw new Error('STRIPE_SECRET_KEY is not configured or is a placeholder');
  }
  
  return new Stripe(secretKey);
};

export async function POST(request: NextRequest) {
  try {
    const { amount, deliveryInfo } = await request.json();

    // Initialize Stripe instance
    const stripe = getStripe();

    // Créer un PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customerName: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
        customerEmail: deliveryInfo.email,
        customerPhone: deliveryInfo.phone,
        deliveryAddress: deliveryInfo.address,
        deliveryCity: deliveryInfo.city,
        deliveryPostalCode: deliveryInfo.postalCode,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}