/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#006E49',
      },
    },
  },
  plugins: [
    /* utilitario para el enlace activo (se usa en scroll.ts) */
    function ({ addUtilities }) {
      addUtilities({
        '.active': {
          color: '#fff',
        },
      })
    },
  ],
}
