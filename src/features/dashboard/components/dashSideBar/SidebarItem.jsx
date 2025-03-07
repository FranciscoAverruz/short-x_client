/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

export function SidebarItem({ icon, text, active, alert, expanded, onClick, extraClass, onMouseEnter, onMouseLeave, subItems, isOpen }) {
  const hasSubItems = subItems && subItems.length > 0;

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer transition-colors duration-100 group h-10
        text-light-grlText dark:text-dark-grlText
        ${active ? 'bg-light-btnMenuHoverBg/10 dark:bg-dark-btnMenuHoverBg text-light-hoverTitle dark:text-dark-hoverTitle' : 'hover:text-light-hoverTitle dark:hover:text-dark-hoverTitle'}
        ${extraClass}
      `}
      onClick={onClick}
      onMouseEnter = {onMouseEnter}
      onMouseLeave = {onMouseLeave}
    >
      {icon}
      <span
        className={`relative overflow-hidden transition-all duration-100 whitespace-nowrap text-sm
        ${expanded ? "w-52 ml-3" : "w-0 ml-0"}`}
      >
        {text}

      </span>
      {/* Indicador de submenú */}
      {hasSubItems && (
        <span className={`transition-transform ${expanded ? "block mr-1 ml-auto" : "absolute -right-2"}`}>
          {isOpen ? <FiChevronDown /> : <FiChevronRight />}
          
        </span>
      )}

      {/* Indicador de alerta (si existe) */}
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-dark-accent group-hover:bg-dark-background transition-all duration-150
          ${expanded ? "" : "top-2"}`}
        />
      )}

      {/* Tooltip para texto cuando está colapsado */}
      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
