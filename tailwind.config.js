/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        BeVietnam: '"Be Vietnam Pro", sans-serif',
      },
      colors: {
        "gray-very-light": "#E5E7EB",
        "gray-light": "#E5E7EBCC",
        "gray-medium": "#6C727F",
        "gray-transparent": "#212936",
        "gray-dark": "#121826",
      },
    },
  },
  plugins: [],
};
