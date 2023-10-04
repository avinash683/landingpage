/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#003974',
        primary_md: '#2d639e',
        secondaryColor: '#53b7e8',
        primary_bg: '#fcfcfc',
        lightgray: '#ebebec',
        darkgray: '#9fa1a4',
        mediumgray: '#cdcfd0',
      },
      animation: {
        'spin-slow': 'spin 3s infinite',
      },
      borderRadius: {
        '5': '5px',
      },
    },
    container: {
      padding: {
        sm: '1rem',
        lg: '1rem',
        xl: '1rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
