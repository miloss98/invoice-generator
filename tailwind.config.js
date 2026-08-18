/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef5fc",
          100: "#dbe9f8",
          200: "#b3d0ef",
          300: "#8bb6e6",
          400: "#6c9eda",
          500: "#4a80c4",
          600: "#3a66a0",
          700: "#2f5280",
          800: "#28405f",
          900: "#213448",
        },
        ink: {
          50: "#f7f7f6",
          100: "#e8e7e4",
          200: "#d1cfc9",
          300: "#aeaba3",
          400: "#88857d",
          500: "#6b6863",
          600: "#54514c",
          700: "#413f3b",
          800: "#2c2a28",
          900: "#1a1918",
        },
        status: {
          paid: "#3b8a5e",
          unpaid: "#c4574a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        signature: ["Caveat", "cursive"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["13px", { lineHeight: "18px" }],
        base: ["14px", { lineHeight: "20px" }],
        md: ["15px", { lineHeight: "22px" }],
        lg: ["17px", { lineHeight: "24px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        signature: ["28px", { lineHeight: "32px" }],
      },
      borderRadius: {
        DEFAULT: "6px",
        card: "10px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
