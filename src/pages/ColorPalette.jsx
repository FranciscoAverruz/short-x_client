/* eslint-disable no-unused-vars */
import React from 'react';

const theme = {
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
    accent:	"#FA7575",
    cardBg:	"#EBF3FF",
    cardAccent:	"#605DFF",
    btnSecBg:	"#F1F3FF",
    btnSecBorder:	"#CDD2F3",
    btnSecText:	"#4A516D"
    // background: "#F0F9FC", // Fondo principal en modo claro (derivado de #78B7D0)
    // // background: "#E4F3F9", // Fondo principal en modo claro (derivado de #78B7D0)
    // secondary: "#D3E5E8", // Fondo secundario en modo claro (gris suave con un toque de azul)
    // primary: "#227B94", // Color primario en modo claro (azul medio)
    // primaryHover: "#78B7D0", // Color primario al hacer hover en modo claro (azul más claro)
    // accent: "#FFDC7F", // Color de acento en modo claro (amarillo suave)
    // accentHover: "#F9D04E", // Color de acento al hacer hover en modo claro (amarillo un poco más oscuro)
    // secondaryAccent: "#FFCC66", // Color secundario en modo claro (amarillo anaranjado suave)
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
    accent:	"#FA7575",
    cardBg:	"#5EA2FF",
    cardAccent:	"#19182D",
    btnSecBg:	"#1C2036",
    btnSecBorder:	"#4A516D",
    btnSecText:	"#F4F6F9"
    // deepBg: "#1A1D2B",
    // background: "#16325B", // Fondo principal en modo oscuro (azul oscuro suave)
    // secondary: "#1F4F68", // Fondo secundario en modo oscuro (gris azulado oscuro)
    // primary: "#78B7D0", // Color primario en modo oscuro (azul claro suave)
    // primaryHover: "#5A96B3", // Color primario al hacer hover en modo oscuro (azul un poco más oscuro)
    // accent: "#FFDC7F", // Color de acento en modo oscuro (amarillo suave)
    // accentHover: "#F9D04E", // Color de acento al hacer hover en modo oscuro (amarillo un poco más oscuro)
    // secondaryAccent: "#FFB84D", // Color secundario en modo oscuro (amarillo anaranjado)
  },
  text: {
    light: {
      heading: "#16325B", // Color de los títulos en modo claro (azul oscuro)
      subheading: "#4A5A61", // Color de los subtítulos en modo claro (azul medio)
      paragraph: "#5A6A74", // Color de los párrafos en modo claro (azul suave)
    },
    dark: {
      heading: "#E4F3F9", // Color de los títulos en modo oscuro (blanco suave)
      subheading: "#A0C4D3", // Color de los subtítulos en modo oscuro (azul gris claro)
      paragraph: "#B4D6E4", // Color de los párrafos en modo oscuro (azul pálido)
    },
  },
};

const ColorPalette = () => {
  // Función para renderizar los colores
  const renderColors = (colors, mode) => (
    <div className="mb-8" key={mode}>
      <h2 className="text-xl font-bold mb-4 capitalize">{mode} mode</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(colors).map(([name, hex]) => (
          <div key={`${mode}-${name}`} className="flex items-center space-x-4">
            <div
              className="w-12 h-12 rounded"
              style={{ backgroundColor: hex }}
            ></div>
            <div>
              <p className="font-semibold capitalize">{name}</p>
              <p className="text-sm text-gray-600">{hex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Función para renderizar el texto
  const renderText = (text, mode) => (
    <div className="mb-8" key={`${mode}-text`}>
      <h2 className="text-xl font-bold mb-4 capitalize">{mode} text</h2>
      <div className="space-y-4">
        {Object.entries(text).map(([key, color]) => (
          <div key={`${mode}-${key}`} className="flex items-center space-x-4">
            <p className="font-semibold capitalize">{key}:</p>
            <p className="text-sm" style={{ color: color }}>{color}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Color Palette</h1>

      {/* Renderizando los colores */}
      {Object.entries(theme).map(([mode, colors]) => {
        if (mode !== 'text') {
          return renderColors(colors, mode);
        }
        return null;
      })}

      {/* Renderizando el texto */}
      {Object.entries(theme.text).map(([mode, text]) => (
        renderText(text, mode)
      ))}
    </div>
  );
};

export default ColorPalette;