import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        archivo: ['Archivo', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderColor: {
        'light-black': 'var(--light-black-color)',
      },
      textColor: {
        'light-black': 'var(--light-black-color)',
      },
      colors: {
        'soft-gray': '#585660',
        white: 'var(--white-color)',
        black: 'var(--black-color)',
        'light-beige': 'var(--light-beige-color)',
        'dark-gray': 'var(--dark-gray-font)',
      },
    },
  },
  plugins: [],
};
export default config;
