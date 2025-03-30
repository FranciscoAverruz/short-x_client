/* eslint-disable no-unused-vars */
import Sx from "@common/Sx.jsx";
import React from "react";
import Button from "@atoms/Button";
import { useNavigate } from "react-router-dom";
import { RiArrowRightDoubleFill } from "react-icons/ri";

const Footer = () => {
  const navigate = useNavigate();

  const footerOptions = [
    {
      label: "Sobre Nosotros",
      link: "/About",
    },
    {
      label: "Términos y Condiciones",
      link: "/Conditions",
    },
    {
      label: "Política de Privacidad",
      link: "/Privacy",
    },
    {
      label: "Contacto",
      link: "/Contact",
    },
  ];

  return (
    <footer className="flex flex-col-reverse text-sm lg:flex-row items-center lg:justify-between bg-light-bg text-light-Title dark:bg-dark-bg dark:text-dark-Title font-semibold">
      <div className="flex items-center text-sm p-2">
        <p className="text-sm">
          © 2025 <Sx />{" "}
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-start md:justify-center md:space-x-6 shadow-xl lg:shadow-none w-full lg:w-auto p-2">
        {footerOptions.map((option, index) => (
          <Button
            key={index}
            label={option.label}
            variant="navbar"
            icon={RiArrowRightDoubleFill}
            onClick={() => {
              navigate(option.link);
              window.scrollTo(0, 0);
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
