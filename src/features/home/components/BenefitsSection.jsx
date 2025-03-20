/* eslint-disable no-unused-vars */
import React from "react";
import { FaRocket, FaShieldAlt, FaChartBar, FaPalette } from "react-icons/fa";

const benefitsData = [
  {
    icon: FaRocket,
    title: "Rápido y fácil",
    description: "Acorta tus enlaces en segundos sin complicaciones.",
  },
  {
    icon: FaShieldAlt,
    title: "Seguro",
    description:
      "Protege tus enlaces con seguridad avanzada y sin preocupaciones.",
  },
  {
    icon: FaChartBar,
    title: "Con estadísticas avanzadas",
    description:
      "Obtén detalles sobre el rendimiento de tus enlaces, clics, ubicación geográfica y más.",
  },
  {
    icon: FaPalette,
    title: "Personalización",
    description: "Crea enlaces únicos y representativos de tu marca.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="w-full flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-3/4 lg:w-full max-w-6xl">
        {benefitsData.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center text-center transition-transform duration-300 group hover:scale-105 cursor-pointer"
            >
              <div className="w-28 h-28 flex items-center justify-center rounded-full shadow-xl group-hover:-translate-y-2 transition-all ease-in-out bg-gradient-to-t from-light-sectionBg/70 via-transparent/10 dark:from-light-iconTo/20 to-transparent/50 dark:to-transparent/100">
                <IconComponent className="text-dark-accent drop-shadow-md text-5xl" />
              </div>
              <section className="h-28 md:h-36">
                <h3 className="text-light-Title dark:text-dark-Title font-bold mt-5">
                  {benefit.title}
                </h3>
                <p className="text-light-grlText dark:text-dark-grlText mt-0 md:mt-2">
                  {benefit.description}
                </p>
              </section>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BenefitsSection;
