/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "text-Tlight-heading2",
    "text-Tdark-heading2"
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#f8fafc",
          sectionBg:	"#FFFFFF", 
          btnMenuHoverBg:	"#605DFF", //10%
          inputBg:	"#F1F3FF",
          ttBg:	"#1C2035",
          hoverTitle:	"#605DFF",
          Title:	"#1C2035",
          subTitle:	"#7686BC",
          grlText:	"#303651",
          inputText:	"#697089",
          // accent:	"#FA7575",
          accent: "#FFCC66",
          cardBg:	"#EBF3FF",
          cardAccent:	"#605DFF",
          btnSecBg:	"#F1F3FF",
          btnSecBorder:	"#CDD2F3",
          btnSecText:	"#4A516D",
          // buttons
          primaryFrom: "#3B6FFF",
          primaryVia: "#1C4BFF",
          primaryTo: "#0F36C8",
          secondaryFrom: "#A5C8FF",
          secondaryVia: "#7AAFFF",
          secondaryTo: "#4F8BFF",

          dangerFrom: '#f87171',
          dangerVia: '#f5a9a9',
          dangerTo: '#f44336',
          btnDangerBorder: '#f44336',
          // navbarFrom: "#3B6FFF",
          // navbarVia: "#1C4BFF",
          // navbarTo: "#0F36C8",

          link: "#3B6FFF",
          iconFrom: "#4F8BFF",
          iconVia: "#3B6FFF",
          iconTo: "#1C4BFF",

          free:"#28A745",
          pro:"#C0C0C0",
          premium:"#DAA520"
        },
        dark: {
          bg: "#0d0d0e",
          sectionBg:	"#151516",
          btnMenuHoverBg:	"#1f1f20", //10%
          inputBg:	"#989EB3",
          ttBg:	"#1C2035",
          hoverTitle:	"#9290FF",
          Title:	"#F4F6F9",
          subTitle:	"#9FAEE1",
          grlText:	"#E6E8F0",
          inputText:	"#F1F3FF",
          accent:	"#FFB84D",
          cardBg:	"#5EA2FF",
          cardAccent:	"#19182D",
          btnSecBg:	"#1C2036",
          btnSecBorder:	"#4A516D",
          btnSecText:	"#F4F6F9",
          // buttons
          primaryFrom: "#1C4BFF",
          primaryVia: "#0F36C8",
          primaryTo: "#081F7A",
          secondaryFrom: "#4F8BFF",
          secondaryVia: "#3B6FFF",
          secondaryTo: "#1C4BFF",

          dangerFrom: '#d32f2f',
          dangerVia: '#c2185b',
          dangerTo: '#b71c1c',
          btnDangerBorder: '#b71c1c',
          // navbarFrom: "#1C4BFF",
          // navbarVia: "#0F36C8",
          // navbarTo: "#081F7A",

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

// Tlight: {
//   heading: "#16325B", // Color de los títulos en modo claro (azul oscuro)
//   subheading: "#4A5A61", // Color de los subtítulos en modo claro (azul medio)
//   paragraph: "#5A6A74", // Color de los párrafos en modo claro (azul suave)
// },
// Tdark: {
//   heading: "#E4F3F9", // Color de los títulos en modo oscuro (blanco suave)
//   subheading: "#A0C4D3", // Color de los subtítulos en modo oscuro (azul gris claro)
//   paragraph: "#B4D6E4", // Color de los párrafos en modo oscuro (azul pálido)
// },

// Light
          // background: "#F0F9FC", // Fondo principal en modo claro (derivado de #78B7D0)
          // secondary: "#D3E5E8", // Fondo secundario en modo claro (gris suave con un toque de azul)
          // primary: "#227B94", // Color primario en modo claro (azul medio)
          // primaryHover: "#78B7D0", // Color primario al hacer hover en modo claro (azul más claro)
          // accent: "#FFDC7F", // Color de acento en modo claro (amarillo suave)
          // accentHover: "#F9D04E", // Color de acento al hacer hover en modo claro (amarillo un poco más oscuro)
          // secondaryAccent: "#FFCC66", // Color secundario en modo claro (amarillo anaranjado suave)

// dark
          // deepBg: "#1A1D2B",
          // background: "#16325B", // Fondo principal en modo oscuro (azul oscuro suave)
          // secondary: "#1F4F68", // Fondo secundario en modo oscuro (gris azulado oscuro)
          // primary: "#78B7D0", // Color primario en modo oscuro (azul claro suave)
          // primaryHover: "#5A96B3", // Color primario al hacer hover en modo oscuro (azul un poco más oscuro)
          // accent: "#FFDC7F", // Color de acento en modo oscuro (amarillo suave)
          // accentHover: "#F9D04E", // Color de acento al hacer hover en modo oscuro (amarillo un poco más oscuro)
          // secondaryAccent: "#FFB84D", // Color secundario en modo oscuro (amarillo anaranjado)