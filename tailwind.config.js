/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'index.html',
    './src/**/*.{js,ts,jsx,tsx,vue,html}',
  ],
  theme: {
    extend: {
      colors: {
        primary : '#006E49',
        backdrop: '#0F221D',
      },
      height:    { dvh: '100dvh' },
      minHeight: { dvh: '100dvh' },
      screens: {
        /* ancho */
        ms:  '320px', mm: '375px', ml: '425px',
        sm:  '640px', md: '768px', lg: '1024px',
        xl: '1280px', '2xl': '1440px',
        '3xl': '1920px',      //  WQHD
        '4k' : '2560px',      //  UHD (DPR 1) o 4 K escalado al 150 %
        'h-ultra': { raw: '(min-height: 1150px)' },
        /* alto */
        'h-sm': { raw: '(min-height: 760px)'  },
        'h-md': { raw: '(min-height: 800px)'  },
        'h-lg': { raw: '(min-height: 900px)'  },
      },
      keyframes: {
        heartbeat: {
          '0%,100%': { transform: 'scale(1)',   opacity: '1'   },
          '25%'   : { transform: 'scale(1.25)', opacity: '1'   },
          '40%'   : { transform: 'scale(1)',    opacity: '.8'  },
        },
      },
      animation: {
        heartbeat: 'heartbeat 1s ease-in-out infinite',
      },
    },
  },

  /* ───────── Plugins ───────── */
  plugins: [
    // variantes por altura de viewport
    function ({ addVariant }) {
      addVariant('tall',  '@media (min-height: 1200px)');
      addVariant('short', '@media (max-height: 850px)');
    },

    // utilitario .active (tu scroll.ts)
    function ({ addUtilities }) {
      addUtilities({
        '.active': { color: '#fff' },
      });
    },
  ],
};
