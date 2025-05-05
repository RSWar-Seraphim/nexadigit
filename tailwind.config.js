/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'index.html',
    './src/**/*.{js,ts,jsx,tsx,vue,html}',   // ajusta según tu stack real
  ],
  theme: {
    extend: {
      /* ── Paleta corporativa ────────────────────────────────────────── */
      colors: {
        primary : '#006E49',   // verde NexaDigit
        backdrop: '#0F221D',   // fondo del loader
      },

      /* ── Animación heartbeat ───────────────────────────────────────── */
      keyframes: {
        heartbeat: {
          '0%,100%': { transform: 'scale(1)',   opacity: '1'   },
          '25%'   : { transform: 'scale(1.25)', opacity: '1'   },
          '40%'   : { transform: 'scale(1)',    opacity: '.80' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 1s ease-in-out infinite',
      },
    },
  },

  /* ── Plugins utilitarios ───────────────────────────────────────────── */
  plugins: [
    // enlace activo (scroll.ts)
    function ({ addUtilities }) {
      addUtilities({
        '.active': { color: '#fff' },
      })
    },
  ],
}
