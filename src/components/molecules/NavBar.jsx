/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* src/components/molecules/Navbar.jsx */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaLink, FaBars, FaTimes } from 'react-icons/fa';
import Button from '@atoms/Button';
import Brand from "@common/Brand.jsx"

const navbarOptions = [
  {
    label: 'Acortar Link',
    icon: FaLink,
    link: '/',
    variant: 'navbar',
  },
  {
    label: 'Login',
    icon: FaSignInAlt,
    link: '/login',
    variant: 'secondary',
  },
  {
    label: 'Registro',
    icon: FaUserPlus, 
    link: '/register',
    variant: 'primary',
  },
];

const Navbar = ({ hasScrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  const handleNavigation = (link) => {
    navigate(link);
    setMenuOpen(false);
  };

  return (
    <nav className={`w-full h-16 md:h-auto flex items-center flex-col md:flex-row md:justify-between md:px-6 py-2 ${menuOpen ? 'shadow-md bg-light-bg dark:bg-dark-bg backdrop-blur-sm bg-opacity-90' : ''}`}>
      <section className="flex flex-row gap-9 md:gap-3 items-center ">
        <div className={`transition-all duration-300 ${ hasScrolled || menuOpen ? "opacity-100" : "opacity-0"}`}> 
          <Brand /> 
        </div>
        <Button
          className="md:hidden text-light-Title dark:text-dark-Title p-2 self-center"
          onClick={toggleMenu}
          icon={menuOpen ? FaTimes : FaBars }
        />
      </section>

      <section className={`flex flex-row justify-center gap-5 md:mt-0 md:max-h-screen md:opacity-100 md:bg-transparent w-screen md:w-auto py-2 md:py-0 transition-all duration-200 ease-in-out ${menuOpen ? 'max-h-screen opacity-100 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md mt-0' : 'max-h-0 opacity-0'}`}>
        <div className="flex space-x-2">
          {navbarOptions.map((option, index) => (
            <Button
              key={index}
              label={option.label}
              icon={option.icon}
              onClick={() => handleNavigation(option.link)}
              variant={option.variant}
              className="flex flex-col md:flex-row w-[6.5rem] md:w-auto px-2 py-1"
            />
          ))}
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
