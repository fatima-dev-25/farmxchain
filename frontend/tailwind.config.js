/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fef9f3',
          100: '#fceae1',
          200: '#f8d4bf',
          300: '#f4a86b',
          400: '#dc8c42',
          500: '#c17b2c',
          600: '#a86824',
          700: '#8b531b',
          800: '#6e4414',
          900: '#4d300d',
        },
        secondary: {
          50: '#f0f8f3',
          100: '#d4ede1',
          200: '#a8dcc0',
          300: '#6fc39f',
          400: '#4aaa7e',
          500: '#2d8659',
          600: '#236849',
          700: '#1b4d37',
          800: '#133628',
          900: '#0c231a',
        },
        accent: {
          50: '#fffbea',
          100: '#fff3c9',
          200: '#ffe68f',
          300: '#ffd858',
          400: '#ffc628',
          500: '#f0b000',
          600: '#c98900',
          700: '#a26900',
          800: '#7a4e00',
          900: '#523400',
        },
        neutral: {
          50: '#faf9f7',
          100: '#f3efea',
          200: '#e8e2da',
          300: '#d6cdc1',
          400: '#bfb2a3',
          500: '#8b7d71',
          600: '#6d6257',
          700: '#554c42',
          800: '#3d3530',
          900: '#2a251f',
        },
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
        'hard': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
      },
    },
  },
  plugins: [],
}
