/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Input from "@molecules/Input.jsx";
import border from "@assets/border.webp";
import avatar from "@assets/avatar.jpg";
import Button from "@atoms/Button.jsx";
import useLogin from "@hooks/useLogin";
import AuthLayout from "@auth/AuthLayout";
import SubmitButton from "@molecules/SubmitButton.jsx";
import PasswordInput from "@molecules/PasswordInput";
import { AuthContext } from "@context/AuthContext";
import { MdAlternateEmail } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const { login } = useLogin();
  const { loading, error, dispatch, isAdmin } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) {
      setLoginError(error);
    }
  }, [error]);

  useEffect(() => {
    if (isAdmin !== undefined && isAdmin !== null) {
      const redirectPath =
        location.state?.from || (isAdmin ? "/adminctrl" : "/");
      navigate(redirectPath);
    }
  }, [isAdmin, location, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    await login(credentials, keepLoggedIn, dispatch);
  };

  return (
    <AuthLayout
      title="Iniciar sesión"
      borderSrc={border}
      imageSrc={avatar}
      onSubmit={handleSubmit}
      className="mt-14 mb-5 md:mt-auto md:mb-auto"
      formContent={
        <>
          <Input
            label={"Correo electrónico"}
            id="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            required="required"
            icon={<MdAlternateEmail />}
          />
          <PasswordInput
            label={"Contraseña"}
            id="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          <article className="flex flex-col md:flex-row justify-start md:justify-between gap-1 text-sm my-4">
            <Input
              id="keep-logged"
              type="checkbox"
              label="Mantener sesión iniciada"
              checked={keepLoggedIn}
              onChange={() => setKeepLoggedIn(!keepLoggedIn)}
            />

            <span className="ml-[1.4rem] md:mr-2">
              <Button
                label="Olvide mi contraseña"
                variant="link"
                className="mt-2 ml-1 md:ml-auto"
              />
            </span>
          </article>

          <article
            className={`flex flex-col-reverse md:flex-row justify-between items-center rounded-md text-sm md:pl-2 w-full ${
              error || loginError ? " bg-red-100 w-full" : ""
            }`}
          >
            <span>
              {loginError && <p className="text-red-700">{loginError}</p>}
            </span>
            <span className="w-full md:w-auto">
              <SubmitButton
                label="Iniciar Sesión"
                loading={loading}
                className="z-[2] w-full md:w-auto gap-1 px-[0.4rem]"
              />
            </span>
          </article>

          <article className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-baseline w-full border-t-2 mt-5">
            <span className="labelInput">¿Aún no tienes una Cuenta?</span>
            <Button
              label="Regístrate"
              variant="link"
              onClick={() => navigate("/register")}
              className="font-bold mt-5 md:ml-1"
            />
          </article>
        </>
      }
      borderClasses={
        {
          // left: "scale-y-[-1] -rotate-90",
          // right: "scale-y-[-1] rotate-90"
        }
      }
    />
  );
};

export default Login;
