const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],

  theme: {
    extend: {
      screens: {
        xs: '450px', // => @media (min-width: 450px) { ... }
      },
      colors: {
        primary: '#c6312a',
        'primary-dark': '#b91c1c',
        'primary-50': '#fef2f2',
        'primary-100': '#fee2e2',
        'primary-200': '#fecaca',
        'primary-300': '#fca5a5',
        'primary-400': '#f87171',
        'primary-500': '#ef4444',
        'primary-600': '#dc2626',
        'primary-700': '#b91c1c',
        'primary-800': '#991b1b',
        'primary-900': '#7f1d1d',
        'blue-gray': {
          50: '#E3E7ED',
          100: '#B9C3D3',
          200: '#8D9DB5',
          300: '#627798',
          400: '#415C84',
          500: '#1A4373',
          600: '#133C6B',
          700: '#083461',
          800: '#022B55',
          900: '#001B3D',
        },
      },

      fontFamily: {
        default: ['var(--font-inter)', ...fontFamily.sans],
        heading: ['var(--font-heading)', ...fontFamily.sans],
        cal: ['var(--font-cal)', ...fontFamily.sans],
        title: ['var(--font-title)', ...fontFamily.sans],
        intro: ['var(--font-intro)', ...fontFamily.sans],
        lato: ['var(--font-lato)', ...fontFamily.sans],
        raleway: ['var(--font-raleway)', ...fontFamily.sans],
        mono: ['Consolas', ...fontFamily.mono],
      },
      // typography: {
      //   DEFAULT: {
      //     css: {
      //       h1: {
      //         fontFamily: 'Cal Sans',
      //       },
      //       h2: {
      //         fontFamily: 'Cal Sans',
      //       },
      //       h3: {
      //         fontFamily: 'Cal Sans',
      //       },
      //       'blockquote p:first-of-type::before': { content: 'none' },
      //       'blockquote p:first-of-type::after': { content: 'none' },
      //     },
      //   },
      // },

      transitionTimingFunction: {
        brand: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        250: '250ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },

  daisyui: {
    logs: false,
    themes: [
      {
        light: {
          primary: '#c6312a',
          'primary-content': '#ffffff',
          secondary: '#0ea5e9',
          accent: '#37CDBE',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
    // require("tailwindcss-animate"),
  ],
};
