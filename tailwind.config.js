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
          '100%': {height: '30rem'}
        },
      },
      animation: {
        'dropdown': 'dropdown 0.25s ease-out'
      }
    },
  },
  plugins: [],
}
