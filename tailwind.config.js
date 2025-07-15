/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#E0C3FC',
          DEFAULT: '#B37BFF',
          dark: '#6C47FF',
        },
        secondary: '#1A1A1A',
        accent: '#FFD700',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #6C47FF, #B37BFF)',
      }
    },
  },
  plugins: [],
}
