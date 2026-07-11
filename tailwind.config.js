/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EA580C",
        secondary: "#F97316",
        background: "var(--bg-color, #FFFFFF)",
        altBackground: "var(--alt-bg-color, #FFF7ED)",
        textColor: "var(--text-color, #1F2937)",
      },
      fontFamily: {
        heading: ["Nunito", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      }
    },
  },
  plugins: [],
}
