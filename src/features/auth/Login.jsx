/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Input from "@molecules/Input.jsx";
import Button from "@atoms/Button.jsx";
import useLogin from "@hooks/useLogin";
import AuthLayout from "@auth/AuthLayout";
import SubmitButton from "@molecules/SubmitButton.jsx";
import PasswordInput from "@molecules/PasswordInput";
import { AuthContext } from "@context/AuthContext";
import { MdAlternateEmail } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { RegisterContext } from "@context/RegisterContext";

const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const { login } = useLogin();
  const { loading, error, dispatch, isAdmin } = useContext(AuthContext);
  const { registrationData, setRegistrationData } = useContext(RegisterContext);

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
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });
    if (id === "email") {
      setRegistrationData((prev) => ({
        ...prev,
        email: value,
      }));
      console.log("loginData in Login ===> ", value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    await login(credentials, keepLoggedIn, dispatch);
  };

  return (
    <AuthLayout
      title="Iniciar sesión"
      onSubmit={handleSubmit}
      formContent={
        <form onSubmit={handleSubmit} className="pt-[1px]">
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
              className="ml-3"
            />

            <span className="ml-[1.4rem] md:mr-2">
              <Button
                label="Olvide mi contraseña"
                variant="link"
                className="mt-2 ml-4 md:ml-auto"
                onClick={() => navigate("/login/forgotpassword")}
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
                className="z-[2] w-full md:w-auto gap-1 p-3"
              />
            </span>
          </article>

          <article className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-baseline w-full border-t-2 mt-10 pt-5 md:pt-0 labelInput">
            ¿Aún no tienes una Cuenta?
            <Button
              label="Regístrate"
              variant="link"
              onClick={() => navigate("/register")}
              className="font-bold mt-5 md:ml-1"
            />
          </article>
        </form>
      }
    />
  );
};

export default Login;
