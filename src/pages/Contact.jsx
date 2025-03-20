/* eslint-disable no-unused-vars */
import { API_URL } from "@src/Env.jsx";
import { logError } from "@utils/logger";
import React from "react";
import axios from "axios";
import border from "@assets/border.webp";
import contact from "@assets/contact.png";
import EmailForm from "@layouts/EmailForm.jsx";
// import { useLocation } from "react-router-dom";

const Contact = () => {
  const handleEmailSubmit = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/send-email`, formData);
      console.log(response); // Verifica la respuesta del servidor
    } catch (error) {
      logError("Error sending the message", error);
      throw new Error("Error sending the message");
    }
  };

  return (
    <main className="flex justify-center items-center w-screen pb-10 pt-20 md:pb-8 md:pt-14">
      <section className="w-[90%] lg:w-auto grlContainer relative">
        <aside className="absolute sectionBg shadow-lg w-[104%] md:w-[102%] -left-2 h-[7.85rem] md:h-[16.9rem] lg:w-[15.55rem] lg:h-[105%] -top-[0.67rem] lg:-top-[2.5%] lg:left-0 rounded-xl -z-0 hidden md:block"></aside>

        <aside className="absolute -left-[63px] -bottom-10 w-40 z-0 md:z-[2]">
          <img src={border} alt="" />
        </aside>

        <div className="md:w-[90vw] lg:w-auto grid grid-cols-1 lg:grid-cols-4 grid-rows-[auto_1fr] lg:grid-rows-1 h-full p-2 md:p-0 rounded-xl items-center ">
          <header className="hidden md:flex justify-center lg:justify-start items-start md:items-center -translate-x-4 -translate-y-4 md:-translate-x-0 md:-translate-y-0 w-[111%] md:w-[89.65%] lg:w-full h-[110%] md:h-[105%] flex-col md:flex-row lg:flex-col rounded-md innerlight z-[1] md:py-0 lg:py-5 gradientToB">
            <img
              src={contact}
              alt="Contact"
              className="w-24 md:w-56 md:p-5 lg:p-10 drop-shadow-xl mt-0 lg:mt-5 opacity-95"
            />
            <div className="hidden md:flex flex-col items-center md:mb-0">
              <span className="shortX md:text-6xl lg:text-4xl -mb-3 md:-mb-0 opacity-60">
                {" "}
                short-X{" "}
              </span>
              <p className="smart md:text-2xl lg:text-sm opacity-40">
                Your Smart Link Shortener
              </p>
            </div>
          </header>

          <article className="p-0 md:p-8 lg:p-6 xl:p-8 flex flex-col-reverse md:flex-col justify-center items-center w-full h-full col-span-3">
            <div className="w-full h-full">
              <h1 className="flex title mb-4 justify-start tracking-tight pt-8">
                Déjanos un mensaje
              </h1>
              <div className="w-auto md:w-[90%] lg:w-auto px-0 md:px-2">
                <EmailForm onSubmit={handleEmailSubmit} />
              </div>
            </div>
          </article>
        </div>

        <aside className="absolute -right-[63px] md:-right-[70px] lg:-right-[63px] -top-10 z-[2] lg:mt-2 w-40">
          <img src={border} alt="" className="scale-x-[-1] scale-y-[-1]" />
        </aside>
      </section>
    </main>
  );
};

export default Contact;
