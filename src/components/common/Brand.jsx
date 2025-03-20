/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Sx from "@common/Sx.jsx";
import logo from "@assets/icon.png";
import React from "react";

const Brand = ({
  classGrl,
  classTxt = "lg:flex-row lg:gap-2",
  classIcon = "w-12",
  classP,
  classTsx,
}) => {
  return (
    <article className={`flex flex-row items-center gap-2 ${classGrl}`}>
      <img src={logo} alt="Logo" className={`drop-shadow-md ${classIcon}`} />
      <div
        className={`flex flex-col items-start lg:items-baseline md:mb-0 ${classTxt}`}
      >
        <Sx className={`text-4xl -mb-3 lg:-mb-0 ${classTsx}`} />
        <p className={`smart ${classP}`}>Your Smart Link Shortener</p>
      </div>
    </article>
  );
};

export default Brand;
