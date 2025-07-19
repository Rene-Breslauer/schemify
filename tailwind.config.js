/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
    return ({ opacityValue }) =>
      opacityValue !== undefined
        ? `rgb(var(${variableName}) / ${opacityValue})`
        : `rgb(var(${variableName}))`;
  }
  
  module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx,mdx,css}',
      './gatsby-browser.js',
      './gatsby-ssr.js',
    ],
    theme: {
      extend: {
        colors: {
          dark:   withOpacity('--bg-dark-rgb'),
          body:   withOpacity('--text-body-rgb'),
          accent: withOpacity('--text-accent-rgb'),
          white: withOpacity('--text-white-rgb'),
        },
        fontFamily: {
          sans: ['RobotoFlex', 'sans-serif'],
          mono: ['VictorMono', 'monospace'],
        },
      },
    },
    plugins: [],
  };
  