/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com', 'via.placeholder.com', 'placehold.co'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  },
  // Skip build-time validation for API routes that require env vars
  experimental: {
    outputFileTracingExcludes: {
      '/api/**': ['./node_modules/@swc/wasm'],
    },
  },
  // Ensure environment variables are available during build
  serverRuntimeConfig: {
    // Will only be available on the server side
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
}

module.exports = nextConfig