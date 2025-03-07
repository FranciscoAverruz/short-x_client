/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* src/components/atoms/Button.jsx */
import React from 'react';

const Button = ({ label, onClick, type = 'button', variant = 'primary', icon: Icon, className = 'rounded-lg', ClassBtnIco="w-5 h-5",title, onMouseEnter, onMouseLeave }) => {
  const buttonClasses = {
    primary: "btnPrimary",
    secondary: "btnSecondary",
    navbar: "btnNavbar",
    link: "btnLink",
    toggle: "btnIcon",
    danger: "btnDanger",
    action: "actionBtn"
  };

  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type={type}
      onClick={onClick}
      title={title}
      className={`flex flex-row ${buttonClasses[variant]} ${className}`}
    >
      {Icon && <Icon className={`flex justify-center items-center ${ClassBtnIco}`} />}
      {label}
    </button>
  );
};

export default Button;