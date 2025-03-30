/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Icon from "@atoms/Icon.jsx";
import React from "react";
import InputField from "@atoms/InputField.jsx";
import ErrorMessage from "@atoms/ErrorMessage.jsx";
import LabelWithTooltip from "@molecules/LabelWithTooltip.jsx";

const Input = ({
  id,
  name,
  value,
  checked,
  onChange,
  placeholder,
  type = "text",
  className,
  classCheckBox,
  location = "mt-2",
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
    default: "inputStyle shadow",
    error:
      "px-4 py-2 border border-red-500 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-500",
  };

  const isCheckboxOrRadio = type === "checkbox" || type === "radio";

  return (
    <div
      className={`relative ${location} ${
        isCheckboxOrRadio ? "flex items-center" : ""
      }`}
    >
      {!isCheckboxOrRadio && label && (
        <LabelWithTooltip htmlFor={id} required={required}>
          {label}
        </LabelWithTooltip>
      )}

      <div className="relative flex items-center">
        {icon && !isCheckboxOrRadio && !isTextarea && <Icon icon={icon} />}

        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            ref={inputRef}
            className={`${inputClasses[variant]} ${className} w-full ${icon ? "pl-12" : ""} h-32 resize-none`}
            {...rest}
          />
        ) : (
          <InputField
            id={id}
            name={name}
            type={type}
            value={type === "checkbox" ? undefined : value}
            checked={isCheckboxOrRadio ? checked : undefined}
            onChange={onChange}
            placeholder={!isCheckboxOrRadio ? placeholder : undefined}
            required={required}
            inputRef={inputRef}
            inputMode={inputMode}
            pattern={pattern}
            className={`${inputClasses[variant]} ${className} ${icon && !isCheckboxOrRadio && !isTextarea ? "pl-12" : "" }`}
            {...rest}
          />
        )}
      </div>

      {(isCheckboxOrRadio) && label && (
        <label htmlFor={id} className={`ml-2 cursor-pointer labelInput ${classCheckBox}`}>
          {label}
        </label>
      )}

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default Input;
