import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: '#556B2F',
          50: '#E8EDE0',
          100: '#D9E2C8',
          200: '#BBC997',
          300: '#9DB066',
          400: '#7F9735',
          500: '#556B2F',
          600: '#445526',
          700: '#33401D',
          800: '#222A13',
          900: '#11150A',
        },
        gold: {
          DEFAULT: '#C5A059',
          50: '#F8F3E8',
          100: '#F0E8D4',
          200: '#E5D0A1',
          300: '#D9B876',
          400: '#CEA04B',
          500: '#C5A059',
          600: '#A68244',
          700: '#7D6233',
          800: '#544122',
          900: '#2B2111',
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
        },
        premium: {
          gold: '#C5A059',
          'gold-light': '#F8E7AE',
          'gold-dark': '#8C6A28',
          burgundy: '#800020',
          'burgundy-light': '#9B2847',
          'burgundy-dark': '#5C0015',
        },
      },
    },
  },
  plugins: [],
};
export default config;

