/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, lazy } from "react";
import Brand from "@common/Brand.jsx";
import Button from "@atoms/Button";
import { useNavigate } from "react-router-dom";
import { PiSignInFill } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import { HiOutlineUserPlus } from "react-icons/hi2";
const ThemeSwitch = lazy(() => import("@common/ThemeSwitch"));

const navbarOptions = [
  {
    label: "Inicio",
    icon: IoHomeOutline,
    link: "/",
    variant: "navbar",
  },
  {
    label: "Login",
    icon: PiSignInFill,
    link: "/login",
    variant: "navbar",
  },
  {
    label: "Registro",
    icon: HiOutlineUserPlus,
    link: "/register",
    variant: "secondary",
  },
];

const NavBar = ({ hasScrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleNavigation = (link) => {
    navigate(link);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`w-full h-16 md:h-auto flex items-center flex-col md:flex-row md:justify-between md:px-6 py-2 ${
        menuOpen
          ? "md:shadow-md bg-light-bg dark:bg-dark-bg backdrop-blur-sm bg-opacity-90"
          : ""
      }`}
    >
      <section
        className="flex flex-row justify-between px-3 md:gap-3 items-center cursor-pointer w-screen md:w-auto"
      >
        <span
          onClick={() => navigate("/")}
          className={`transition-all duration-75 md:duration-200 ${
            hasScrolled || menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          <Brand />
        </span>
        <Button
          className="md:hidden text-light-Title dark:text-dark-Title p-2 self-center"
          onClick={toggleMenu}
          icon={menuOpen ? FaTimes : FaBars}
        />
      </section>

      <section
        className={`flex flex-row justify-center gap-0 md:mt-0 md:max-h-screen md:opacity-100 md:bg-transparent w-screen md:w-auto py-2 md:py-0 transition-all duration-200 ease-in-out ${
          menuOpen
            ? "max-h-screen opacity-100 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md mt-0 w-screen md:w-auto"
            : "opacity-0 -translate-x-96 md:translate-x-0"
        }`}
      >
        <aside className="flex flex-row items-center justify-center">
          <article className="flex flex-row gap-0 md:gap-2">
            {navbarOptions.map((option, index) => (
              <Button
                key={index}
                label={option.label}
                icon={option.icon}
                onClick={() => handleNavigation(option.link)}
                variant={option.variant}
                className={`flex flex-col md:flex-row w-[6.5rem] md:w-auto px-1 md:px-2 py-1 scale-90 md:scale-100 gap-2 ${option.variant === "secondary" ? "brightness-75 dark:brightness-200 dark:hover:brightness-90 mr-2" : ""}`}
              />
            ))}
          </article>
          <article className="flex rotate-90 scale-75 md:rotate-0 md:scale-100 h-5 md:h-fit -p-5 md:p-1 justify-center items-center">
            <ThemeSwitch />
          </article>
        </aside>
      </section>
    </nav>
  );
};

export default NavBar;
