/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EA580C",
        secondary: "#F97316",
        background: "#FFFFFF",
        altBackground: "#FFF7ED",
        textColor: "#1F2937",
      },
      fontFamily: {
        heading: ["Nunito", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        float: 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
