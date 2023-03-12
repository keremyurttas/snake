/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primary: "#0f0f17",
        success: "#29E75E",
        boundary: "#272727",
      },
      colors: {
        success: "#29E75E",
      },
      borderColor: { boundary: "#272727" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
