/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Button from "@atoms/Button";
import { TbSend } from "react-icons/tb";

const SubmitButton = ({
  label,
  loading,
  disabled,
  onClick,
  classNameButton = "",
  icon = TbSend,
  ...props
}) => {
  return (
    <article className="w-full flex justify-end">
      <Button
        type="submit"
        label={loading ? "Cargando..." : label}
        disabled={disabled || loading}
        variant={`${!disabled ? "primary" : "disabledBtn"}`}
        className={`px-4 py-2 ${classNameButton}`}
        icon={icon}
        onClick={onClick}
        {...props}
      />
    </article>
  );
};

export default SubmitButton;
