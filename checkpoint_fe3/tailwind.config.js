/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      'accent': "#41dfd0",
      'primary': "#1a9389",
      'accent-focus': "#3dd6c8",
      'base-content': "#2a323c",
      "base-100": "#1d232a",
      "base-200": "#191e24",
      },
      listStyleImage: {
        checkmark: 'url("/src/assets/check.png")',
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
