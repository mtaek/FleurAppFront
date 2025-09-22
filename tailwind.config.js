/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e4',
          200: '#bbe5cc',
          300: '#8dd0a7',
          400: '#57b37c',
          500: '#36a15a',
          600: '#2a7c45',
          700: '#236239',
          800: '#1f4e30',
          900: '#1a4029',
          950: '#0d2316',
        },
        secondary: {
          50: '#fefdf6',
          100: '#fdf9e8',
          200: '#f9f1c5',
          300: '#f4e497',
          400: '#edd368',
          500: '#e5c344',
          600: '#d1a636',
          700: '#ad812f',
          800: '#8c652c',
          900: '#735328',
          950: '#422d13',
        },
        cream: {
          50: '#fefefe',
          100: '#fefcf9',
          200: '#fef7ed',
          300: '#fdefd5',
          400: '#fbe0b4',
          500: '#f8cc82',
          600: '#f4b85e',
          700: '#f0a542',
          800: '#ec9332',
          900: '#d47722',
        },
        sage: {
          50: '#f6f8f6',
          100: '#e3ebe4',
          200: '#c9d8cb',
          300: '#a3bea7',
          400: '#759c7b',
          500: '#567e5d',
          600: '#426349',
          700: '#364f3b',
          800: '#2e4132',
          900: '#27362b',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}