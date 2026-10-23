import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        fg: "var(--color-fg)",
        muted: "var(--color-muted)",
        line: "var(--color-line)",
        online: "var(--color-online)",
        fill: "var(--color-fill)",
      },
      fontFamily: {
        departure: ["departure", "departure Fallback"],
      },
    },
  },
  plugins: [],
} satisfies Config;
