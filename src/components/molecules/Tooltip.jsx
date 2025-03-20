/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

const Tooltip = ({ children, tooltipText, tooltipStyles = {}, ...rest }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    if (tooltipText) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (tooltipText) {
      setShowTooltip(false);
    }
  };

  return (
    <div className="relative inline-block" {...rest}>
      <div
        className="cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {showTooltip && tooltipText && (
        <div
          className="absolute text-xs font-semibold bg-light-ttBg text-light-accent rounded px-2 py-1 opacity-100 transition-opacity duration-200 z-10"
          style={{
            top: "0px",
            left: "100%",
            marginLeft: "5px",
            whiteSpace: "nowrap",
            ...tooltipStyles,
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
