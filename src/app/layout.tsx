import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '@/components/providers/QueryProvider';
import StripeProvider from '@/components/providers/StripeProvider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: {
    default: 'FlowerShop - Livraison de fleurs fraîches à domicile',
    template: '%s | FlowerShop'
  },
  description: 'Découvrez notre sélection de bouquets et arrangements floraux. Livraison rapide et sécurisée partout en France. Fleurs fraîches pour toutes vos occasions.',
  keywords: ['fleurs', 'bouquet', 'livraison', 'fleuriste', 'mariage', 'anniversaire', 'roses', 'arrangements floraux'],
  authors: [{ name: 'FlowerShop Team' }],
  creator: 'FlowerShop',
  publisher: 'FlowerShop',
  metadataBase: new URL('https://flowershop.fr'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://flowershop.fr',
    title: 'FlowerShop - Livraison de fleurs fraîches',
    description: 'Découvrez notre sélection de bouquets et arrangements floraux. Livraison rapide et sécurisée.',
    siteName: 'FlowerShop',
    images: [
      {
        url: '/assets/images/products/bouquet_salon.jpeg',
        width: 1200,
        height: 630,
        alt: 'FlowerShop - Bouquets de fleurs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowerShop - Livraison de fleurs fraîches',
    description: 'Découvrez notre sélection de bouquets et arrangements floraux.',
    images: ['/assets/images/products/bouquet_salon.jpeg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <QueryProvider>
          <StripeProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </StripeProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#22c55e',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  )
}