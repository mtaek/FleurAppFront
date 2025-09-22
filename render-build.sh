#!/usr/bin/env bash
# Build script for Render

# Install dependencies
npm ci

# Set placeholder environment variables for build if not set
export STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY:-"sk_test_placeholder_for_build"}
export STRIPE_PUBLIC_KEY=${STRIPE_PUBLIC_KEY:-"pk_test_placeholder_for_build"}
export GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY:-"placeholder_for_build"}

# Build the application
npm run build