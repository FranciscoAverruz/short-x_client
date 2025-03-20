/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const BarItem = ({
  icon: Icon,
  label,
  link,
  onClick,
  extraClass = "",
  isOpen,
}) => {
  return (
    <Link
      to={link}
      onClick={onClick}
      className={`flex items-center space-x-4 px-4 py-2 text-light-grlText dark:text-dark-grlText hover:bg-light-accent dark:hover:bg-dark-accent rounded-md ${extraClass}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

export default BarItem;
