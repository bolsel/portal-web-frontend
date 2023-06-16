const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../../libs/shared/ui/presets/default')],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
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
      },
    },
  },
  plugins: [],
};
