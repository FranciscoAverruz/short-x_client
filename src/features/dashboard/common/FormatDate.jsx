const FormatDate = (fechaString) => {
  if (!fechaString) return "";
  const fecha = new Date(fechaString);
  if (isNaN(fecha)) return "Fecha inválida";
  return fecha.toLocaleString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export default FormatDate;
