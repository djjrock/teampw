/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      borderRadius: {
        'full': '9999px',
        'lg': '0.625rem',
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      colors: {
        primary: {
          DEFAULT: '#18181B',
          hover: '#27272A',
        },
        background: {
          DEFAULT: '#f8fafc',
          dark: '#0a0a0a',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#141414',
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}