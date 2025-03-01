/* eslint-disable no-unused-vars */
import { Fragment, useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { BiLogOutCircle } from "react-icons/bi";
import { AuthContext } from '@context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import Button from "@atoms/Button.jsx"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FotoUsuario() {

  const {loading, error, user, email, username, isAdmin, dispatch} = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate("/")
  };

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
                <Button
                  label="Gestionar Cuenta"
                  variant="toggle"
                  icon = {MdOutlineSwitchAccount}
                  className="grlTxt profileMenuItems"
                />
                <Button
                  label="Configuración"
                  variant="toggle"
                  icon={CiSettings}
                  className="grlTxt profileMenuItems"
                />
          </section>
          <div className="py-1">
                <Button
                  label="Salir"
                  variant="toggle"
                  icon={BiLogOutCircle}
                  onClick={handleLogout}
                  className="grlTxt profileMenuItems"
                />
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}