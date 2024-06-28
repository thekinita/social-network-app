import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#EFEFF3',
        border: 'rgba(255, 255, 255, .1)',
        primary: '#6F3AFF'
      },
      padding: {
        layout: '1.25rem'
      },
      transitionDuration: {
        DEFAULT: '444ms'
      },
      transitionTimingFunction: {
        DEFAULT: 'easy-in-out'
      }
    },
  },
  plugins: [],
};
export default config;
