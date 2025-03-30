const plans = [
  {
    name: "Plan Gratuito",
    description: "Ideal para empezar. Acorta enlaces ilimitados con estadísticas básicas.",
    features: [
      "Duración de los enlaces: 24 horas",
      "Acceso a estadísticas básicas (total de clics)",
      "Enlaces generados aleatoriamente (sin personalización)",
      "Sin soporte premium",
    ],
    pricing: { monthly: "$0 / mes", annual: "$0 / año" },
    buttonText: "Empezar",
    isRelevant: false,
    variant: "secondary",
    planType: "free",
  },
  {
    name: "Plan Pro",
    description: "Más control y personalización. Analíticas avanzadas",
    features: [
      "Duración de los enlaces: 1 mes",
      "Estadísticas detalladas (ubicación, dispositivos, horarios)",
      "Personalización de enlaces (puedes elegir el sufijo)",
      "Soporte prioritario (respuestas más rápidas)",
    ],
    pricing: { monthly: "$10 / mes", annual: "$102 / año" },
    buttonText: "Seleccionar",
    isRelevant: true,
    variant: "primary",
    planType: "pro",
  },
  {
    name: "Plan Premium",
    description: "La experiencia definitiva. Dominios personalizados y análisis detallado.",
    features: [
      "Número de enlaces: Ilimitado",
      "Duración de los enlaces: Indefinida",
      "Estadísticas avanzadas (informes detallados y análisis de tendencias)",
      "Personalización avanzada de enlaces y dominios (puedes elegir el dominio)",
      "Soporte VIP 24/7 (atención exclusiva)",
    ],
    pricing: { monthly: "$20 / mes", annual: "$216 / año" },
    buttonText: "Elegir Plan",
    isRelevant: false,
    variant: "secondary",
    planType: "premium",
  },
];

export default plans;
