/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const InputField = ({
  id,
  name,
  type = "text",
  value,
  checked,
  onChange,
  placeholder,
  className,
  inputRef,
  inputMode,
  pattern,
  ...rest
}) => (
  <input
    id={id || name}
    name={name}
    type={type}
    value={type === "checkbox" ? undefined : value}
    checked={type === "checkbox" ? checked : undefined}
    onChange={onChange}
    placeholder={type !== "checkbox" ? placeholder : undefined}
    ref={inputRef}
    inputMode={inputMode}
    pattern={pattern}
    className={`${className} ${
      type === "checkbox" ? "w-4 h-4 cursor-pointer" : "w-full"
    }`}
    {...rest}
  />
);

export default InputField;
