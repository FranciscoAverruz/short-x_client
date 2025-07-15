/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Input from "@molecules/Input.jsx";
import axios from "axios";
import AuthLayout from "@auth/AuthLayout";
import SubmitButton from "@molecules/SubmitButton.jsx";
import { API_URL } from "@src/Env.jsx";
import { RegisterContext } from "@context/RegisterContext";
import { MdAlternateEmail } from "react-icons/md";
import Button from "@atoms/Button.jsx";
import { useNavigate } from "react-router-dom";
import useRateLimiter from "@hooks/useRateLimiter.jsx";
import { toast } from "sonner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
  tooManyAttempts,
  formattedCooldown,
  registerAttempt,
} = useRateLimiter("forgotPassword", 1, 300);
  const { registrationData, setRegistrationData } = useContext(RegisterContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        setError("");
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, message]);

  const handleChange = (e) => {
    const { value } = e.target;
    setRegistrationData((prev) => ({
      ...prev,
      email: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tooManyAttempts) {
      toast.error("Demasiados intentos. Por favor intenta más tarde.");
      return;
    }
    registerAttempt();

    setMessage("");
    setError("");
    try {
      const response = await axios.post(`${API_URL}/request-newpassword`, {
        email: registrationData.email,
      });
      setMessage("Correo enviado. Revisa tu bandeja de entrada.");
      setRegistrationData((prev) => ({ ...prev, email: "" }));
    } catch (err) {
      console.error(err);
      if (err.response?.status === 404) {
        setError(
          "Usuario no encontrado. debes introducir el Email que tienes relacionado con tu cuenta"
        );
      } else {
        setError("Hubo un error al enviar el correo.");
      }
    }
  };

  return (
    <AuthLayout
      title="Restablecer contraseña"
      formContent={
        <form onSubmit={handleSubmit} >
        <p
          className={`font-semibold text-red-700 dark:text-red-400 text-sm w-full transition-opacity duration-300 -translate-y-5 ${
            tooManyAttempts ? "opacity-100" : "opacity-0"
          } text-center md:text-left`}
          style={{ minHeight: "1.5rem" }}
        >
          Demasiados intentos fallidos. Intenta de nuevo en
          <span className="font-bold ml-2">{formattedCooldown}</span>
        </p>

        <p className="flex subTitle1 text-base text-center md:text-left">
          Te enviaremos un enlace para restablecer la contraseña de la cuenta asociada a este correo.
        </p>
          <Input
            label={"Correo electrónico"}
            id="email"
            type="email"
            value={registrationData.email}
            onChange={handleChange}
            required
            icon={<MdAlternateEmail />}
          />
          <p className="border-t-0 text-sm grlTxt pb-5 md:pb-2 ml-2">
            * Asegúrate de estar usando un correo válido. Revisa también tu
            carpeta de spam.
          </p>
          <section className="grid grid-rows-2 md:grid-rows-1 grid-cols-6 gap-0 h-full">
            {error && (
              <p className="col-span-6 md:col-span-4 row-start-2 md:row-start-1 font-semibold text-red-700 dark:text-red-400 text-sm w-full h-full flex items-center text-center">
                {error}
              </p>
            )}
            {message && (
              <p className="col-span-6 md:col-span-4 row-start-2 md:row-start-1 font-semibold text-green-700 dark:text-green-400 text-sm w-full h-full flex items-center text-center">
                {message}
              </p>
            )}
            <span className="col-span-6 md:col-span-2 col-start-1 md:col-start-5">
              <SubmitButton
                label="Enviar enlace"
                // loading={loading}
                disabled={tooManyAttempts}
                className="z-[2] w-full p-3"
              />
            </span>
          </section>
          <article className="flex flex-col md:flex-row text-center md:text-left items-center md:items-baseline w-full border-t-2 mt-5 md:mt-10 pt-5 labelInput">
            ¿Aún no tienes una Cuenta?
            <Button
              label="Regístrate"
              variant="link"
              onClick={() => navigate("/register")}
              className="font-bold mt-2 md:mt-0 md:ml-1"
            />
          </article>
          <article className="flex flex-col md:flex-row text-center md:text-left items-center md:items-baseline w-full mt-5 md:mt-0 labelInput">
              ¿Tienes problemas para recuperar tu contraseña?
            <Button
              label="Contactanos"
              variant="link"
              onClick={() => navigate("/contact")}
              className="font-bold mx-2 mt-2 md:mt-0"
            />
          </article>
        </form>
      }
    />
  );
};

export default ForgotPassword;
