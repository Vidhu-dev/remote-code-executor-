/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],// Specify the paths to your template files
  theme: {
    fontFamily: {
      'sans': ['Roboto Mono', 'ui-sans-serif', 'system-ui'], // Set Roboto as the default sans-serif font
      'mono': ['ui-monospace'], // Mono font for mono use cases
    },
    extend: {},
  },
  plugins: [],
};
