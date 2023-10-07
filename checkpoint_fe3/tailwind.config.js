/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      'accent': "#1fb2a6",
      },
    },
    
  },
  plugins: [],
  darkMode: "class",
};
