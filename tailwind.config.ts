import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "768px",
      },
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "soft-gray": "#585660",
        "dark-gray": "#404040",
        "light-beige": "#EEEEEE",
        "light-white": "#EFEDF3",
        "light-black": "#3B3B3B",
        "mid-gray": "#8F8F8F",
        white: "#FFFFFF",
        black: "#000000",
      },
      borderColor: {
        'light-black': 'var(--light-black-color)',
      },
      textColor: {
        'light-black': 'var(--light-black-color)',
      },
    },
  },
  plugins: [],
};
export default config;
