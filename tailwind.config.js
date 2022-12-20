/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  variants: {
    width: ['responsive', 'hover', 'focus'],
    extend: {
      backgroundColor: ['active', 'hover', 'focus', 'invalid']
    }
  },
  plugins: [require('tailwindcss-invalid-variant-plugin')],
  theme: {
    minWidth: {
      400: '400px'
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '934px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    }
  }
};
