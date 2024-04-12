/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: [
  //   'src/pages/**/*.{ts,tsx}',
  //   'src/components/**/*.{ts,tsx}'
  // ],
  content: [
    'src/pages/**/*.tsx',
    'src/components/**/*.tsx'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

