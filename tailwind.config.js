/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#034C2B',
          light: '#0B6B3D',
          dark: '#022F1B',
        },
        gold: {
          DEFAULT: '#C19F42',
          dark: '#AC892D',
          light: '#D0C08A',
        },
        cream: '#F8F5EC',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
