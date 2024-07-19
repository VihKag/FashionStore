/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./index.html",
  "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'poetsen': ['Poetsen One', 'sans-serif'], // Thêm Poetsen One vào đây
      },
    },
  },
  plugins: [],
};

