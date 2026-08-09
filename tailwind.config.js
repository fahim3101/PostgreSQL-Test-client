/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14151A',
        paper: '#F7F7F4',
        surface: '#FFFFFF',
        line: '#E4E2DC',
        pine: {
          DEFAULT: '#2F5D50',
          dark: '#1F3F36',
          light: '#3F7A69',
        },
        gold: '#B8892B',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
