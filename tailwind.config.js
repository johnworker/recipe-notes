/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem", // 16px
        sm: "1.25rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      // 2XL 以上限制內容最大寬，讓左右都有舒服的留白
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#2563eb", // 藍
          soft: "#e0e7ff",
        },
        ink: {
          1: "#111827",
          2: "#374151",
        },
      },
      boxShadow: {
        card: "0 6px 24px -8px rgba(0,0,0,0.12)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
