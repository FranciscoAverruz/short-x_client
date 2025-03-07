import { Fragment, useContext, useState } from "react";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { BiLogOutCircle } from "react-icons/bi";
import { AuthContext } from '@context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import Button from "@atoms/Button.jsx"
import { HiOutlineUser, HiUser } from "react-icons/hi2";
import { PiGear, PiGearFill } from "react-icons/pi";

function FotoUsuario() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const {email, username, dispatch} = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate("/")
  };

  const buttons = [
    {
      label: 'Gestionar Cuenta',
      icon: { default: HiOutlineUser , active: HiUser },
      link: "/dashboard/myaccount",
    },
    {
      label: 'Configuración',
      icon: { default: PiGear, active: PiGearFill },
      link: "/dashboard/config",
    }
  ];

  return (
      <Menu as="div" className="relative ml-3"> 
      <div>
        <MenuButton className="w-10 h-10 relative flex rounded-full text-sm focus:outline-none ">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        {/* <img
          className="h-10 w-10 rounded-full" 
          src="https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="perfil"
        /> */}
        <span className="subTitle1">
          <FaCircleUser className="h-10 w-10 rounded-full"/>
        </span>
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-light-inputText/20 rounded-md sectionBg shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none grlTxt">
          <section className="p-4 shadow-md">
              <span className="block font-bold text-xl">
                {username}
              </span>
              <span className="block text-xs">
                {email}
              </span>
          </section>
          <section className="py-1">
            {buttons.map((button, index) => {
              const isActive = location.pathname === button.link;
              console.log("isActive >>> ", isActive)
              return (
              <Button
                onMouseEnter={() => setHoveredLink(button.label)}
                onMouseLeave={() => setHoveredLink(null)}
                key={index}
                active={isActive}
                label={button.label}
                variant="navbar"
                onClick= {() => navigate(button.link)}
                icon={ (hoveredLink === button.label || isActive) && button.icon ? button.icon.active : button.icon?.default }
                className={`grlTxt profileMenuItems flex justify-start hover:text-light-hoverTitle dark:hover:text-dark-hoverTitle hover:brightness-100 font-semibold ${isActive? "text-light-hoverTitle dark:text-dark-hoverTitle bg-light-btnMenuHoverBg/10 dark:bg-dark-btnMenuHoverBg opacity-100 brightness-100" : ""}`}
              />
            )})
            }
          
          </section>
          <div className="py-1">
                <Button
                  label="Salir"
                  variant="toggle"
                  icon={BiLogOutCircle}
                  onClick={handleLogout}
                  className="grlTxt profileMenuItems text-red-500 dark:text-red-600 hover:bg-red-200 dark:hover:bg-red-950 dark:hover:text-red-600 hover:text-red-500"
                />
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

export default FotoUsuario;