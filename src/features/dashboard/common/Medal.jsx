/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FaMedal } from "react-icons/fa6";

const Medal = ({ plan, classNameIcon = "" }) => {
  return (
    <article
      className={`md:mt-0 flex flex-row md:flex-col items-center justify-center w-fit md:w-1/3 dropshadow-lg text-center ${classNameIcon}`}
    >
      <span
        className={`${
          plan?.startsWith("free")
            ? "text-[#28A745]"
            : plan?.startsWith("pro")
            ? "text-[#C0C0C0]"
            : plan?.startsWith("premium")
            ? "text-[#DAA520]"
            : ""
        }`}
      >
        <FaMedal />
      </span>
    </article>
  );
};

export default Medal;
