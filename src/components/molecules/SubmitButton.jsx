/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Button from "@atoms/Button";
import { TbSend } from "react-icons/tb";

const SubmitButton = ({
  label,
  loading,
  onClick,
  className = "",
  icon = TbSend,
  ...props
}) => {
  return (
    <article className="w-full flex justify-end">
      <Button
        type="submit"
        label={loading ? "Cargando..." : label}
        disabled={loading}
        variant="primary"
        className={`px-4 py-2 ${
          loading ? "bg-light-grlText" : ""
        } ${className}`}
        icon={icon}
        onClick={onClick}
        {...props}
      />
    </article>
  );
};

export default SubmitButton;
