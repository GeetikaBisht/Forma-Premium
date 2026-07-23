/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garant', 'Georgia', 'serif'],
        sans: ['DM Sans', 'Helvetica Regular', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        helvetica: ['"Helvetica Regular"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#1E325A',
          80: 'rgba(30,50,90,0.8)',
          60: 'rgba(30,50,90,0.6)',
          20: 'rgba(30,50,90,0.2)',
        },
        brass: {
          DEFAULT: '#8B7355',
          light: '#C4A97D',
        },
        cream: '#E8E0D0',
        'bg-main': '#f0f0f0',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
}
