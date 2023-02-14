/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        dropdown: {
          '0%': {height: '0'},
          '100%': {height: 'fit-content'}
        },
        show: {
          '0%': {transform: 'scaleY(0)'},
          '100%': {transform : 'scaleY(1)'}
        },
        opac: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'}
        },
        scale: {
          '0%': {height: 'inherit', width: 'inherit'},
          '100': {height: '30rem', width: '50rem'}
        }
      },
      animation: {
        'dropdown': 'dropdown 0.25s ease-in-out',
        'show': 'show 0.3s ease-out',
        'opac': 'opac 0.4s ease-out',
        'scale': 'scale 0.2s ease-in-out'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}