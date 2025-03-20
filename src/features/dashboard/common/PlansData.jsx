const plans = [
  {
    name: "Plan Gratuito",
    description: "Límite de 5 enlaces al mes, duración de 24 horas",
    features: [
      "Número de enlaces: 5/mes",
      "Duración de los enlaces: 24 horas",
      "Acceso a estadísticas básicas (total de clics)",
      "Enlaces generados aleatoriamente (sin personalización)",
      "Sin soporte premium",
    ],
    pricing: { monthly: "$0/mes", annual: "$0/año" },
    buttonText: "Empezar",
    isRelevant: false,
    variant: "secondary",
    planType: "free",
  },
  {
    name: "Plan Pro",
    description: "Límite de 50 enlaces al mes, duración de 7 días",
    features: [
      "Número de enlaces: 50/mes",
      "Duración de los enlaces: 7 días",
      "Estadísticas detalladas (ubicación, dispositivos, horarios)",
      "Personalización de enlaces (puedes elegir el sufijo)",
      "Soporte prioritario (respuestas más rápidas)",
    ],
    pricing: { monthly: "$6/mes", annual: "$5/año" },
    buttonText: "Seleccionar",
    isRelevant: true,
    variant: "primary",
    planType: "pro",
  },
  {
    name: "Plan Premium",
    description: "Enlaces ilimitados, duración indefinida",
    features: [
      "Número de enlaces: Ilimitado",
      "Duración de los enlaces: Indefinida",
      "Estadísticas avanzadas (informes detallados y análisis de tendencias)",
      "Personalización avanzada de enlaces y dominios (puedes elegir el dominio)",
      "Soporte VIP 24/7 (atención exclusiva)",
      "Protección con contraseña (para enlaces más seguros)",
    ],
    pricing: { monthly: "$20/mes", annual: "$15/año" },
    buttonText: "Elegir Plan",
    isRelevant: false,
    variant: "secondary",
    planType: "premium",
  },
];

export default plans;
