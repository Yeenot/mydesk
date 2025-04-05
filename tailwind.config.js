/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{html,ts,css}" // Include all Angular HTML and TypeScript files
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '10%': { opacity: '1', transform: 'translateY(0)' },
          '90%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-in-out': 'fadeInOut 3.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}

