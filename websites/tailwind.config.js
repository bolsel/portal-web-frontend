const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { parseColor } = require('tailwindcss/lib/util/color');
const plugin = require('tailwindcss/plugin');

const toRGB = (value) => parseColor(value).color.join(' ');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../../libs/shared/ui/presets/default')],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),

    join(__dirname, '../_libs/', '**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'primary-base': 'rgb(var(--c-primary-base) / <alpha-value>)',
        'primary-dark': 'rgb(var(--c-primary-dark) / <alpha-value>)',
        'primary-50': 'rgb(var(--c-primary-50) / <alpha-value>)',
        'primary-100': 'rgb(var(--c-primary-100) / <alpha-value>)',
        'primary-200': 'rgb(var(--c-primary-200) / <alpha-value>)',
        'primary-300': 'rgb(var(--c-primary-300) / <alpha-value>)',
        'primary-400': 'rgb(var(--c-primary-400) / <alpha-value>)',
        'primary-500': 'rgb(var(--c-primary-500) / <alpha-value>)',
        'primary-600': 'rgb(var(--c-primary-600) / <alpha-value>)',
        'primary-700': 'rgb(var(--c-primary-700) / <alpha-value>)',
        'primary-800': 'rgb(var(--c-primary-800) / <alpha-value>)',
        'primary-900': 'rgb(var(--c-primary-900) / <alpha-value>)',
      },
    },
  },
  // plugins: [],
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ':root': {
          '--c-primary-base': toRGB('#c6312a'),
          '--c-primary-dark': toRGB('#b91c1c'),
          '--c-primary-50': toRGB('#fef2f2'),
          '--c-primary-100': toRGB('#fee2e2'),
          '--c-primary-200': toRGB('#fecaca'),
          '--c-primary-300': toRGB('#fca5a5'),
          '--c-primary-400': toRGB('#f87171'),
          '--c-primary-500': toRGB('#ef4444'),
          '--c-primary-600': toRGB('#dc2626'),
          '--c-primary-700': toRGB('#b91c1c'),
          '--c-primary-800': toRGB('#991b1b'),
          '--c-primary-900': toRGB('#7f1d1d'),
        },
        '[data-theme=kominfo]': {
          '--c-primary-base': toRGB('#1574ae'),
          '--c-primary-dark': toRGB('#0d5b8c'),
          '--c-primary-50': toRGB('#f0f9ff'),
          '--c-primary-100': toRGB('#e0f2fe'),
          '--c-primary-200': toRGB('#bae6fd'),
          '--c-primary-300': toRGB('#7dd3fc'),
          '--c-primary-400': toRGB('#38bdf8'),
          '--c-primary-500': toRGB('#0ea5e9'),
          '--c-primary-600': toRGB('#0284c7'),
          '--c-primary-700': toRGB('#0369a1'),
          '--c-primary-800': toRGB('#075985'),
          '--c-primary-900': toRGB('#0c4a6e'),
        },
      });
    }),
  ],
  daisyui: {
    logs: false,
    themes: [
      {
        light: {
          primary: '#c6312a',
          secondary: '#0ea5e9',
          accent: '#37CDBE',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
        kominfo: {
          primary: '#1574ae',
          secondary: '#263c80',
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
};
