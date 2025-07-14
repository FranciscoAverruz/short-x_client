/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import PasswordInput from "@molecules/PasswordInput.jsx";
import { useLocation } from "react-router-dom";
import {
  BiSolidMessageSquareCheck,
  BiSolidMessageSquareX,
} from "react-icons/bi";

const PasswordValidation = ({
  password,
  passwordInfo,
  newPassword,
  confirmPassword,
  passwordChecked,
  onPasswordChange,
  onConfirmPasswordChange,
  className
}) => {
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const location = useLocation();
  const register = location.pathname === "/register";

  useEffect(() => {
    setPasswordRequirements({
      minLength: password?.length >= 5 || newPassword?.length >= 5,
      uppercase: /[A-Z]/.test(password || newPassword),
      number: /\d/.test(password || newPassword),
      specialChar: /[!@#$%^&*]/.test(password || newPassword),
    });
  }, [password, newPassword]);

  const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);

  useEffect(() => {
    setIsPasswordValid(allRequirementsMet && password === confirmPassword);
  }, [allRequirementsMet, confirmPassword, password]);

  const passwordRules = [
    { key: "minLength", text: "Longitud mínima de 5 caracteres" },
    { key: "uppercase", text: "Al menos una letra mayúscula" },
    { key: "number", text: "Al menos un número" },
    { key: "specialChar", text: "Al menos un carácter especial (!@#$%^&*)" },
  ];

  return (
    <article
      className={`relative flex flex-col gap-2 w-full ${className} ${
        register ? "md:flex-row" : ""
      }`}
    >
      {register && (
        <PasswordInput
          label="Contraseña"
          id="password"
          value={password}
          onChange={onPasswordChange}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => {
            if (allRequirementsMet) {
              setPasswordFocused(false);
            }
          }}
          className="w-full"
          required
        />
      )}

      {!register && (
        <PasswordInput
          label="Nueva Contraseña"
          id="newPassword"
          value={newPassword}
          onChange={onPasswordChange}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => {
            if (allRequirementsMet) {
              setPasswordFocused(false);
            }
          }}
          className="w-full"
          required
        />
      )}

      {/* password rules on screen ************************************* */}
      <ul
        className={`col-span-2 absolute text-sm mt-3 md:mt-3 transition-all duration-300 top-16 w-full px-2 py-1 md:py-1 z-10  bg rounded-b-lg shadow-md opacity-100
              ${
                (passwordFocused && !allRequirementsMet) || (passwordChecked && !allRequirementsMet)
                  ? "opacity-100 scale-104"
                  : "opacity-0 scale-0"
              }`}
      >
        <div className="text-light-grlText dark:text-dark-grlText font-bold mb-2">
          Asegúrate de incluir:
        </div>

        {passwordRules.map(({ key, text }) => (
          <li key={key} className="flex items-center">
            <span
              className={
                passwordRequirements[key] ? "text-green-500" : "text-red-500"
              }
            >
              {passwordRequirements[key] ? (
                <BiSolidMessageSquareCheck />
              ) : (
                <BiSolidMessageSquareX />
              )}
            </span>
            <span
              className={`ml-2 ${
                passwordRequirements[key] ? "checkTrue" : "checkFalse"
              }`}
            >
              {text}
            </span>
          </li>
        ))}
      </ul>
      {/* ************************************************************** */}
      <PasswordInput
        label={"Confirmar contraseña"}
        id="confirmPassword"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        className="w-full"
        variant={`${passwordInfo?.match ? "default" :"error" }`}
        required
      />
      
    </article>
  );
};

export default PasswordValidation;
