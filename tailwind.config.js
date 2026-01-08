/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#FFF9FD",
        "secondary-color": "#FE3372",
        "base-color": "#18191B",
        "highlight-color": "#FE5C8E",
        "input-color": "#FFC0D3",
      },
    },
  },
  plugins: [],
};
