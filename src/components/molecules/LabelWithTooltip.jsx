/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Tooltip from "./Tooltip";

const LabelWithTooltip = ({
  htmlFor,
  children,
  required,
  className = "",
  tooltipText = "Requerido",
  tooltipStyles = {},
  ...rest
}) => {
  const showTooltip = required ? tooltipText : "";

  return (
    <div className="flex items-center w-fit labelInput">
      <Tooltip tooltipText={showTooltip} tooltipStyles={tooltipStyles}>
        <span className={className} {...rest}>
          {children}
          {required && (
            <span className="ml-1 text-light-accent dark:text-dark-accent font-extrabold">
              *
            </span>
          )}
        </span>
      </Tooltip>
    </div>
  );
};

export default LabelWithTooltip;
