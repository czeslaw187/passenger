/** @type {import('tailwindcss').Config} */
module.exports = {
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
        }
      },
      animation: {
        'dropdown': 'dropdown 0.25s ease-in-out',
        'show': 'show 0.3s ease-out',
        'opac': 'opac 0.4s ease-out'
      },
    },
  },
  plugins: [],
}
