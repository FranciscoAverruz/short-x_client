/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["text-Tlight-heading2", "text-Tdark-heading2", "inputStyle"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#f8fafc",
          sectionBg: "#FFFFFF",
          btnMenuHoverBg: "#605DFF", //10%
          inputBg: "#F1F3FF",
          ttBg: "#1C2035",
          hoverTitle: "#605DFF",
          Title: "#1C2035",
          subTitle: "#7686BC",
          grlText: "#303651",
          inputText: "#697089",
          accent: "#D4A032",
          cardBg: "#EBF3FF",
          cardAccent: "#605DFF",
          btnSecBg: "#F1F3FF",
          btnSecBorder: "#CDD2F3",
          btnSecText: "#4A516D",
          // buttons
          primaryFrom: "#3B6FFF",
          primaryVia: "#1C4BFF",
          primaryTo: "#0F36C8",
          secondaryFrom: "#A5C8FF",
          secondaryVia: "#7AAFFF",
          secondaryTo: "#4F8BFF",

          dangerFrom: "#f87171",
          dangerVia: "#f5a9a9",
          dangerTo: "#f44336",
          btnDangerBorder: "#f44336",
          link: "#3B6FFF",
          iconFrom: "#4F8BFF",
          iconVia: "#3B6FFF",
          iconTo: "#1C4BFF",

          free: "#28A745",
          pro: "#C0C0C0",
          premium: "#DAA520",
        },
        dark: {
          bg: "#0d0d0e",
          sectionBg: "#151516",
          btnMenuHoverBg: "#1f1f20", //10%
          inputBg: "#989EB3",
          ttBg: "#1C2035",
          hoverTitle: "#9290FF",
          Title: "#F4F6F9",
          subTitle: "#9FAEE1",
          grlText: "#E6E8F0",
          inputText: "#F1F3FF",
          accent: "#FFB84D",
          cardBg: "#5EA2FF",
          cardAccent: "#19182D",
          btnSecBg: "#1C2036",
          btnSecBorder: "#4A516D",
          btnSecText: "#F4F6F9",
          // buttons
          primaryFrom: "#1C4BFF",
          primaryVia: "#0F36C8",
          primaryTo: "#081F7A",
          secondaryFrom: "#4F8BFF",
          secondaryVia: "#3B6FFF",
          secondaryTo: "#1C4BFF",

          dangerFrom: "#d32f2f",
          dangerVia: "#c2185b",
          dangerTo: "#b71c1c",
          btnDangerBorder: "#b71c1c",

          link: "#4F8BFF",
          iconFrom: "#3B6FFF",
          iconVia: "#1C4BFF",
          iconTo: "#0F36C8",
        },
      },
    },
  },

  plugins: [],
};
