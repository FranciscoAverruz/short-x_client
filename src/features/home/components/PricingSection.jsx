/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Input from "@molecules/Input.jsx";
import Button from "@atoms/Button.jsx";
import bgPricing from "@assets/bgPricing.webp"
import { useNavigate } from "react-router-dom";
import { FaMedal } from "react-icons/fa6";

const PricingSection = ({ handlePlanSelect }) => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  const togglePlanType = () => {
    setIsAnnual(!isAnnual);
  };

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
      // image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg",
      planType: "free"
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
      // image: "https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg",
      planType: "pro"
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
      // image: "https://images.pexels.com/photos/3130810/pexels-photo-3130810.jpeg",
      planType: "premium"
    },
  ];
  
  const handleSelectPlan = (plan) => {
    if (handlePlanSelect) {
      handlePlanSelect(plan.planType, isAnnual ? "annual" : "monthly"); 
    } else {
      navigate(`/register?plan=${encodeURIComponent(plan.planType)}&billing=${isAnnual ? "annual" : "monthly"}`);
    }
  };
  

  return (
    <main className="flex justify-center items-center flex-col text-center w-full h-fit">
      <h2 className="flex title mb-3 p-5">Encuentra el Plan Perfecto para Ti</h2>
      <label className="flex w-52 justify-center items-center mb-16">
        {/* toggle *************************************************************************/}
        <Input
          type="checkbox"
          id="toggle-dark"
          className="sr-only"
          checked={isAnnual}
          onChange={togglePlanType}
          aria-label="Toggle dark mode"
          role="switch"
          aria-checked={isAnnual}
        />
        <div className="relative bg-light-bg dark:bg-dark-bg w-[14.6rem] h-8 rounded-full shadow-md flex items-center justify-between px-2 transition-colors duration-300 cursor-pointer">
          <span className={`flex justify-center items-center -ml-1 w-28 h-6 rounded-full font-bold transition-colors duration-300 ${isAnnual ? "text-light-subTitle dark:text-dark-subTitle" : "text-light-Title"} z-10`}>
            Mensual
          </span>
          <div className={`absolute left-1 top-1 bg-dark-accent w-28 h-6 rounded-full flex items-center justify-center text-white font-bold shadow-inner transition-transform duration-300 ${isAnnual ? "translate-x-full" : ""} z-0`}></div>
          <span className={`flex justify-center items-center -mr-1 w-28 h-6 rounded-full font-bold transition-colors duration-300 ${isAnnual ? "text-light-Title" : "text-light-subTitle dark:text-dark-subTitle"} z-10`}>
            Anual
          </span>
        </div>
      </label>

      {/* Pricing Cards ********************************************************************/}
      <section className="grid w-[90%] md:w-full grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, index) => (
            <aside key={index} className={`plan flex flex-col md:flex-row lg:flex-col transition-all duration-300 shadow-lg rounded-xl md:rounded-none lg:rounded-xl m-1 ${plan.isRelevant ? "bg-dark-sectionBg/50 text-dark-Title dark:bg-light-sectionBg/40 dark:text-light-Title scale-110 z-20" : "bg-light-sectionBg/50 dark:bg-dark-sectionBg/50  grlTxt scale-100 z-10"}`}>

            <article className={`relative p-5 rounded-t-lg md:rounded-t-none lg:rounded-t-lg flex flex-col items-center md:min-w-44 md:max-w-44 lg:min-w-full lg:max-w-full ${plan.planType}`}
            >
              <div
                className="absolute inset-0 bg-cover rounded-t-lg md:rounded-t-none lg:rounded-t-lg opacity-20"
                style={{ backgroundImage: `url(${bgPricing})` }}
              ></div>
              <h3 className="title text-2xl font-bold">{plan.name}</h3>
              <p className="hidden md:flex lg:hidden absolute bottom-4 left-0 text-lg text-light-Title dark:text-dark-Title bg-light-bg/70 dark:bg-dark-bg/50 p-3 font-bold opacity-100 w-full justify-center items-center">{isAnnual ? plan.pricing.annual : plan.pricing.monthly}</p>
            </article>
            
            <article className="relative flex flex-col flex-grow p-4 pt-16 md:pt-0 lg:pt-12 justify-between rounded-b-xl md:rounded-b-none lg:rounded-b-xl">
            <p className="absolute md:hidden lg:flex top-0 left-0 flex text-lg text-light-Title dark:text-dark-Title bg-light-bg/70 dark:bg-dark-bg/50 p-2 font-bold opacity-100 w-full justify-center items-center">{isAnnual ? plan.pricing.annual : plan.pricing.monthly}</p>
              <section>
                <ul className="list-disc pl-4 mb-1 text-start my-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </section>
              <div className="flex justify-center mt-4">
                <Button 
                  label={plan.buttonText}
                  variant={plan.variant}
                  icon={FaMedal}
                  onClick={() => handleSelectPlan(plan)}
                  className="p-2 w-3/4 opacity-100"
                  ClassBtnIco={`dropshadow-lg ${
                    plan.planType === "free" ? "text-[#28A745]" : 
                    plan.planType === "pro" ? "text-[#C0C0C0]" : 
                    "text-[#DAA520]" 
                      }`}
                />
              </div>
            </article>
          </aside>
        ))}
      </section>
    </main>
  );
};

export default PricingSection;