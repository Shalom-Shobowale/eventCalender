/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#ffffff",
        secondary:"#000000",
        tertiary:"#219ebc"
      },
      fontFamily:{
        Outfit:["Outfit", "open sans"]
      }
    },
  },
  plugins: [],
}