/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import UrlForm from "@urlShortener/UrlForm.jsx";
import Brand from "@common/Brand.jsx"

const HeroSection = () => {
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Acortando enlace:", link);
  };

  return (
    <main className="flex flex-col justify-center items-center text-center px-5 gap-0">
      <Brand classGrl={"flex-row mb-3 md:mb-10"} classTxt={"lg:flex-col text-base md:text-xl"} classIcon={"w-12 md:w-24 mr-1 md:mr-5"} classTsx={"md:text-7xl"} />

      <h1 className="title drop-shadow-xl font-bold lg:gap-0 mt-8">
        Acorta tus enlaces de manera fácil y rápida
      </h1>

      <h2 className="subTitle1 w-full font-semibold">
      Descubre lo fácil que es convertir URLs largas en enlaces cortos y fáciles de compartir.
      </h2>

      <h3 className="flex flex-col md:flex-row subTitle1 justify-center  items-center text-3xl font-bold mt-8 gap-2">
      Pruébalo<strong className="text-light-accent dark:text-dark-accent text-4xl drop-shadow-md bg-light-bg dark:bg-dark-bg rounded-md py-1 px-2 pb-2">GRATIS</strong>
      </h3>

      <p className="w-full mt-8 md:mt-0 my-0 flex-col md:flex-row text-light-inputText dark:text-dark-inputText ">
      los enlaces creados aquí estarán activos por<strong className="ml-1">24 horas.</strong>
      </p>

      {/* Form */}
      <section className="w-full md:w-3/4 mt-3 md:mt-16 px-0 md:px-4 mb-16 md:mb-0">
        <UrlForm link={link} setLink={setLink} onSubmit={handleSubmit}/>
      </section>
    </main>
  );
};

export default HeroSection;
