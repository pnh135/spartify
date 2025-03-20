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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  colors: {
    "bg-primary": "#1C1C1C",
    "container-bg-primary": "#2E2E2E",
    "text-primary": "#fbfbfb",
    accent: "20E937",
  },
  plugins: [],
};
export default config;
