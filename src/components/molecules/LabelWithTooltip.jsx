/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Label from "@atoms/Label.jsx";

const LabelWithTooltip = ({ htmlFor, children, required, className = '', ...rest }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <div className="relative flex items-center w-fit">
      <Label
        htmlFor={htmlFor}
        className={className}
        {...rest}
      >
        {children}
        {required && (
          <span
            className="ml-1 text-light-accent dark:text-dark-accent font-extrabold cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            *
          </span>
        )}
      </Label>

      {required && showTooltip && (
        <div
          className="absolute text-xs font-semibold bg-light-ttBg text-light-accent rounded px-2 py-1 opacity-100 transition-opacity duration-200 z-10"
          style={{
            top: '0px',
            left: '100%',
            marginLeft: '5px',
            whiteSpace: 'nowrap',
          }}
        >
          Requerido
        </div>
      )}
    </div>
  );
};

export default LabelWithTooltip;
