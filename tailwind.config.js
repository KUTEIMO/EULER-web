/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        euler: {
          primary: '#2a6f6a',
          'primary-light': '#3d9a92',
          coral: '#e07a5f',
          mint: '#7ecfc4',
          gold: '#e8b84a',
          success: '#2a9d8f',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
