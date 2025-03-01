/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import LabelWithTooltip from "@molecules/LabelWithTooltip.jsx";
import InputField from "@atoms/InputField.jsx";
import Icon from "@atoms/Icon.jsx";
import ErrorMessage from "@atoms/ErrorMessage.jsx";

const Input = ({
  id,
  name,
  value,
  checked,
  onChange,
  placeholder,
  type = "text",
  className,
  location="mt-2",
  variant = "default",
  label,
  required,
  errorMessage,
  icon,
  inputRef,
  inputMode,
  pattern,
  isTextarea = false,
  ...rest
}) => {
  const inputClasses = {
    default:
      "inputStyle shadow",
    error:
      "px-4 py-2 border border-red-500 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-500",
  };

  return (
    <div className={`relative ${location} ${type === "checkbox" ? "flex items-center" : ""}`}>
      {type !== "checkbox" && label && (
        <LabelWithTooltip htmlFor={id} required={required}>
          {label}
        </LabelWithTooltip>
      )}

      <div className="relative flex items-center">
        {icon && type !== "checkbox" && !isTextarea && <Icon icon={icon}/>}

        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            ref={inputRef}
            className={`${inputClasses[variant]} ${className} w-full ${
              icon ? "pl-12" : ""
            } h-32 resize-none`}
            {...rest}
          />
        ) : (
          <InputField
            id={id}
            name={name}
            type={type}
            value={type === "checkbox" ? undefined : value} 
            checked={type === "checkbox" ? checked : undefined} 
            onChange={onChange}
            placeholder={type !== "checkbox" ? placeholder : undefined} 
            required={required}
            inputRef={inputRef}
            inputMode={inputMode}
            pattern={pattern}
            className={`${inputClasses[variant]} ${className} ${
              icon && type !== "checkbox" && !isTextarea ? "pl-12" : ""
            }`}
            {...rest}
          />
        )}
      </div>

      {type === "checkbox" && label && (
        <label htmlFor={id} className="ml-2 cursor-pointer labelInput">
          {label}
        </label>
      )}

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default Input;