/* eslint-disable no-unused-vars */
import { API_URL } from "@src/Env.jsx";
import { logError } from "@utils/logger";
import Sx from "@common/Sx.jsx";
import React from "react";
import axios from "axios";
import logo from "@assets/icon.png";
import EmailForm from "@layouts/EmailForm.jsx";

const Contact = () => {
  const handleEmailSubmit = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/send-email`, formData);
      console.log(response);
    } catch (error) {
      logError("Error sending the message", error);
      throw new Error("Error sending the message");
    }
  };

  return (
    <main className="flex flex-col lg:flex-row lg:items-start justify-start px-5 md:px-0 min-w-full md:min-w-0 md:max-w-7xl">
      <article className="hidden md:flex lg:flex-col items-center md:justify-center lg:justify-start h-full border-r-0 md:border-b-2 lg:border-b-0 lg:border-r-2 md:pb-16 lg:pb-0 lg:pr-8">
        <img
          src={logo}
          alt="Logo"
          className={"md:w-28 lg:w-36 drop-shadow-xl lg:mt-8 md:mr-5 lg:mr-0"}
        />
        <div className="hidden md:flex flex-col lg:items-center md:mb-0">
          <Sx className="md:text-6xl lg:text-4xl -mb-3 md:-mb-0" />
          <p className="smart md:text-2xl lg:text-sm">
            Your Smart Link Shortener
          </p>
        </div>
      </article>

      <article className="flex lg:pl-8 flex-col-reverse md:flex-col ">
        <div className="w-full h-full">
          <h1 className="flex title mb-4 justify-center lg:justify-start tracking-tight pt-5 md:pt-20 lg:pt-10">
            Déjanos un mensaje
          </h1>
          <div className="w-auto px-0 md:px-2">
            <EmailForm onSubmit={handleEmailSubmit} />
          </div>
        </div>
      </article>
    </main>
  );
};

export default Contact;
