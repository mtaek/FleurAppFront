import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { amount, deliveryInfo } = await request.json();

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