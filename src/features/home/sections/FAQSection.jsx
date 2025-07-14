/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import RevealOnScroll from "@common/RevealOnScroll.jsx";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Qué es un acortador de enlaces?",
      answer:
        "Un acortador de enlaces es una herramienta que permite convertir URLs largas en enlaces más cortos y fáciles de compartir.",
    },
    {
      question: "¿Cómo puedo empezar a usar el servicio?",
      answer:
        'Solo necesitas ingresar tu enlace en el formulario de la página principal y hacer clic en "Acortar". ¡Es rápido y sencillo!',
    },
    {
      question: "¿Cuántos enlaces puedo acortar gratis?",
      answer:
        "En el plan gratuito, puedes acortar hasta 5 enlaces al mes. Si necesitas más, puedes elegir uno de nuestros planes pagos.",
    },
    {
      question: "¿Mis enlaces cortos caducan?",
      answer:
        "Sí, los enlaces en el plan gratuito caducan a los 30 días. Los planes pagos permiten enlaces ilimitados sin fecha de expiración.",
    },
    {
      question: "¿Puedo ver estadísticas de mis enlaces?",
      answer:
        "Sí, los planes pagos incluyen estadísticas detalladas como clics, ubicación geográfica y dispositivo de los usuarios.",
    },
  ];

  return (
    <section className="faq-section p-8 w-screen h-[42rem] md:h-[38rem] pt-0 pb-20 md:pt-20 gap-0 md:gap-10">
      <RevealOnScroll>
      <h2 className="title mb-5 md:mb-8">Preguntas Frecuentes</h2>
      </RevealOnScroll>
      <RevealOnScroll>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <RevealOnScroll>
            <button
              className="faq-question flex justify-between items-center w-full"
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
              <span className="text-lg text-dark-accent">
                {activeIndex === index ? "▲" : "▼"}
              </span>
            </button>
            {activeIndex === index && (
              <p className="faq-answer text-left">{faq.answer}</p>
            )}
          </RevealOnScroll>
          </div>
        ))}
      </div>
      </RevealOnScroll>
    </section>
  );
};

export default FAQSection;
