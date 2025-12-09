/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(14, 86%, 42%)",
        secondary: "hsl(159, 69%, 38%)",
      },
    },
  },
  plugins: [],
};
