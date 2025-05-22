/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'indigo': {
          '950': '#1A1A2E',
          '900': '#2D3047',
          '800': '#424263',
          '700': '#4C4C7C',
        },
        'gold': {
          '500': '#D5A021',
          '400': '#E5B134',
        },
        'amber': {
          '400': '#D5A021',
          '300': '#E5B134',
        },
        'ivory': {
          '100': '#F7F3E8',
          '200': '#EAE3D2',
          '300': '#D8D0BE',
          '400': '#C0B9A3',
        }
      }
    },
  },
  corePlugins: {
    preflight: true,
  },
  // Add custom utility classes
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };
      addUtilities(newUtilities);
    }
  ],
};