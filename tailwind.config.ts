import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0002",
          900: "#1e0004",
          800: "#330009",
        },
        blood: {
          900: "#4a000a",
          800: "#6b000e",
          700: "#8b0012",
        },
        signal: {
          500: "#ab0017",
          400: "#d1001c",
        },
        steel: {
          100: "#fefefe",
          200: "#e3e4e6",
          300: "#c8c8ca",
          400: "#b0b0b0",
          500: "#969696",
        },
        copper: {
          400: "#e6c3b8",
          500: "#cca699",
          600: "#b38c80",
        },
        charcoal: {
          700: "#330009",
          750: "#280007",
          800: "#1e0004",
          850: "#140104",
          900: "#0e0002",
          950: "#0a0002",
        },
        titanium: {
          100: "#ffffff",
          200: "#f0f0f2",
          300: "#d0d1d4",
          400: "#a8a9ad",
          500: "#808288",
          600: "#5a5c61",
        },
        bronze: {
          400: "#d1001c",
          500: "#ab0017",
          600: "#8b0012",
        },
      },
      fontFamily: {
        vazir: ["Vazirmatn", "Tahoma", "Arial", "system-ui", "-apple-system", "sans-serif"],
        lalezar: ["Lalezar", "Vazirmatn", "Tahoma", "Arial", "system-ui", "-apple-system", "sans-serif"],
        inter: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'metal-brushed': 'linear-gradient(90deg, rgba(255,255,255,0.45) 0%, rgba(200,202,200,0.2) 15%, rgba(255,255,255,0.6) 35%, rgba(188,190,188,0.25) 55%, rgba(255,255,255,0.55) 75%, rgba(205,207,205,0.2) 90%, rgba(255,255,255,0.4) 100%), repeating-linear-gradient(0deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 2px, transparent 2px, transparent 5px), repeating-linear-gradient(0deg, rgba(0,0,0,0.065) 0px, rgba(0,0,0,0.065) 1px, transparent 1px, transparent 3px)',
      },
    },
  },
  plugins: [],
};
export default config;
