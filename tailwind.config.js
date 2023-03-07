/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primary: "#0f0f17",
        success: "#29E75E",
      },
      colors: {
        success: "#29E75E",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
