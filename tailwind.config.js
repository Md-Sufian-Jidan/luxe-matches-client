/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#4B1D3F',
        accent: '#D4AF37',
        'bg-soft': '#FDF8F0',
        'text-main': '#1E1E1E',
        'text-secondary': '#6E6E6E',
        btn: '#2C1E3F',
      },
    }
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
  ],
}

