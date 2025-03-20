/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Sx from "@common/Sx.jsx";
import icon from "@assets/icon.png";
import React, { lazy } from "react";
import Button from "@atoms/Button";
import { FaTimes } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
const ThemeSwitch = lazy(() => import("@common/ThemeSwitch"));
const UserProfileMenu = lazy(() => import("@dashNavBar/UserProfileMenu.jsx"));

const DashNav = ({ setExpanded, expanded }) => {
  return (
    <main className="flex justify-between items-center px-3 md:px-5 h-16 shadow-md sectionBg z-[20]">
      <section className="flex flex-row items-center">
        <img src={icon} alt="Logo" className="flex w-8 h-8 md:w-9 md:h-9" />
        <article className="flex flex-row gap-2 items-baseline justify-end overflow-hidden transition-all duration-100 ml-2">
          <h1>
            <Sx className="text-xl md:text-3xl" />
          </h1>
          <p className="hidden md:flex text-xs smart font-stretch-extra-condensed">
            Your Smart Link Shortener
          </p>
        </article>
      </section>

      <section className="flex flex-row space-x-2">
        <>
          <ThemeSwitch />
          <UserProfileMenu />
        </>
        <Button
          className="lg:hidden p-1.5 px-2.5  rounded-lg lg:static z-[50]"
          onClick={() => setExpanded((curr) => !curr)}
          icon={expanded ? FaTimes : FiMoreVertical}
          variant="secondary"
        />
      </section>
    </main>
  );
};

export default DashNav;
