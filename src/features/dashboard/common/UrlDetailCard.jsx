/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const UrlDetailCard = ({ title, clicks, icon, className }) => {
  return (
    <aside
      className={`flex grlTxt grlContainer flex-col justify-center items-center gap-4 p-5 w-full ${className}`}
    >
      <article className="flex flex-row justify-between lg:justify-center lg:gap-10 items-center w-full">
        <span className="text-5xl">{icon}</span>
        <p className="text-5xl">{clicks}</p>
      </article>
      <strong className="text-sm lg:text-lg self-end lg:self-center">
        {title}
      </strong>
    </aside>
  );
};

export default UrlDetailCard;
