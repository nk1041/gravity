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
      }
    },
  },
  plugins: [],
}
