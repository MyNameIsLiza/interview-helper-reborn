/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      'h1': '24px',
      'h2': '20px',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
