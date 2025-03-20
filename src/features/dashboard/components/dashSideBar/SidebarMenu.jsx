/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import { SidebarItem } from "@dashSideBar/SidebarItem.jsx";
import { AuthContext } from "@context/AuthContext";
import { IoExitOutline, IoExit } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineUser,
  HiUser,
  HiOutlineGlobeAlt,
  HiGlobeAlt,
} from "react-icons/hi2";
import {
  PiLinkSimpleHorizontalLight,
  PiLinkSimpleHorizontalDuotone,
  PiBookmarkSimpleLight,
  PiBookmarkSimpleFill,
  PiGear,
  PiGearFill,
} from "react-icons/pi";

const menuItems = [
  {
    icon: { default: <HiOutlineUser />, active: <HiUser /> },
    label: "Mi Cuenta",
    link: "/dashboard/myaccount",
  },
  {
    icon: {
      default: <PiLinkSimpleHorizontalLight />,
      active: <PiLinkSimpleHorizontalDuotone />,
    },
    label: "Mis URLs",
    link: "/dashboard/urls",
    // alert,
    // subItems: [
    //   { label: "Ver", link: "/dashboard/urls/view" },
    //   { label: "Editar", link: "/dashboard/urls/edit" },
    //   { label: "Eliminar", link: "/dashboard/urls/delete" }
    // ]
  },
  {
    icon: {
      default: <PiBookmarkSimpleLight />,
      active: <PiBookmarkSimpleFill />,
    },
    label: "Suscripción",
    link: "/dashboard/subscription",
  },
  {
    icon: { default: <HiOutlineGlobeAlt />, active: <HiGlobeAlt /> },
    label: "Dominios personalizados",
    link: "/dashboard/domains",
  },
  {
    icon: { default: <PiGear />, active: <PiGearFill /> },
    label: "Configuración",
    link: "/dashboard/config",
  },
];

const SidebarMenu = ({ expanded, closeSidebar }) => {
  const { dispatch } = useContext(AuthContext);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredExit, setHoveredExit] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    closeSidebar();
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  const handleNavigation = (link) => {
    navigate(link);
    if (expanded && window.innerWidth < 768) {
      closeSidebar();
    }
  };

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="space-y-2">
      {menuItems.map((item, index) => {
        const isActive = location.pathname === item.link;
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isOpen = openSubmenus[item.label];
        return (
          <div key={index} className="relative">
            <SidebarItem
              onMouseEnter={() => setHoveredLink(item.label)}
              onMouseLeave={() => setHoveredLink(null)}
              icon={
                (hoveredLink === item.label || isActive) && item.icon
                  ? item.icon.active
                  : item.icon?.default
              }
              text={item.label}
              active={isActive}
              onClick={() =>
                hasSubItems
                  ? toggleSubmenu(item.label)
                  : handleNavigation(item.link)
              }
              expanded={expanded}
              alert={item.alert}
              subItems={item.subItems}
              isOpen={isOpen}
              extraClass=""
            ></SidebarItem>

            {hasSubItems && isOpen && expanded && (
              <ul>
                {item.subItems.map((subItem, subIndex) => (
                  <SidebarItem
                    key={subIndex}
                    icon={subItem.icon}
                    text={subItem.label}
                    active={subItem.active}
                    onClick={subItem.onClick}
                    expanded={expanded}
                    extraClass="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 ml-9"
                  />
                ))}
              </ul>
            )}

            {hasSubItems && isOpen && !expanded && (
              <div className="absolute left-full top-5 paragraphText text-sm bg-light-sectionBg dark:bg-dark-sectionBg shadow-lg rounded-md p-3 w-0 z-50">
                <ul className="space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleNavigation(subItem.link)}
                    >
                      {subItem.icon && (
                        <span className="mr-2">{subItem.icon}</span>
                      )}
                      <span>{subItem.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}

      <SidebarItem
        onMouseEnter={() => setHoveredExit(true)}
        onMouseLeave={() => setHoveredExit(false)}
        icon={hoveredExit ? <IoExit /> : <IoExitOutline />}
        text="Salir"
        onClick={handleLogout}
        extraClass="text-red-500 dark:text-red-600 hover:bg-red-200 dark:hover:bg-red-950 dark:hover:text-red-600 hover:text-red-500"
        expanded={expanded}
      />
    </div>
  );
};

export default SidebarMenu;
