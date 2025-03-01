/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import SubmitButton from "@molecules/SubmitButton.jsx";
import useRegister from "@hooks/useRegister.jsx";
import PasswordInput from "@molecules/PasswordInput";
import Button from "@atoms/Button.jsx";
import PricingModal from "@common/PricingModal";
import border from "@assets/border.webp";
import avatar from "@assets/avatar.jpg";
import AuthLayout from "@auth/AuthLayout";
import Input from "@molecules/Input.jsx"; 
import { BiSolidMessageSquareCheck, BiSolidMessageSquareX} from "react-icons/bi";
import useCheckoutSession from "@hooks/useCheckoutSession.jsx";
import { UserContext } from "@context/UserContext.jsx";

import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const Register = () => {
  const [searchParams] = useSearchParams();
  const [plan, setPlan] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [conditionsChecked, setConditionsChecked] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const { registerUser, loading, error } = useRegister();
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    plan: "",
    billingCycle: "", 
    paymentMethodId: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { createCheckoutSession, loadingCheckout, errorCheckout } = useCheckoutSession();

  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const { userData, setUserData, selectedPlan, setSelectedPlan } = useContext(UserContext);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [id]: value,
    });

    if (id === "password") {
      if (!passwordChecked && value.length > 0) {
        setPasswordChecked(true);
      }
      setPasswordRequirements({
        minLength: value.length >= 5,
        uppercase: /[A-Z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[!@#$%^&*]/.test(value),
      });
    }
  };

  const handleCheckboxChange = (e) => {
    setConditionsChecked(e.target.checked);
  };

  const handlePlanSelect = (plan, billingCycle) => {
    setRegistrationData((prevData) => ({
      ...prevData,
      plan,
      billingCycle,
    }));
    setModalOpen(false);
  };

  const stripe = useStripe();
  const elements = useElements();


// HANDLE SUBMIT *********************************************************************************************************
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullPlan = `${registrationData.plan}_${registrationData.billingCycle === "monthly" ? "monthly" : "annual"}`;

    if (!conditionsChecked) {
      alert("Debes aceptar los términos y condiciones para registrarte.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{5,}$/;
    if (!passwordRegex.test(registrationData.password)) {
      alert("La contraseña no cumple con los requisitos.");
      return;
    }

    if (registrationData.password !== registrationData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const dataToSend = {
      username: registrationData.username,
      email: registrationData.email,
      password: registrationData.password,
      confirmPassword: registrationData.confirmPassword,
      plan: fullPlan,
      billingCycle: registrationData.billingCycle,
      paymentMethodId: registrationData.paymentMethodId,

    };

    const handleError = (err) => {
      if (err.response?.data?.error === "EMAIL_ALREADY_EXISTS") {
        setErrorMessage("Este correo ya está registrado.");
      } else if (err.response?.data?.error === "WEAK_PASSWORD") {
        setErrorMessage("La contraseña debe cumplir con los requisitos.");
      } else if (err.response?.data?.error === "PASSWORD_MISMATCH") {
        setErrorMessage("Las contraseñas no coinciden.");
      } else {
        setErrorMessage("Ocurrió un error inesperado. Intenta más tarde.");
      }
    };

    if (registrationData.plan === "free") {
      console.log("registrationData.plan free === ", registrationData.plan)
    try {

      const res = await registerUser(dataToSend);

      if (res && res.message) {
        setSuccessMessage(res.message);
        setErrorMessage("");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      handleError(err);
    }
  } 
  else if (registrationData.plan === "pro" || registrationData.plan === "premium") {
    console.log("Guardando datos en UserContext:", dataToSend);
    console.log("Guardando plan en UserContext:", dataToSend.plan);
    try {
      localStorage.setItem("userData", JSON.stringify(dataToSend));
      localStorage.setItem("selectedPlan", fullPlan);

      const { sessionId, url } = await createCheckoutSession({
        plan: fullPlan,
        billingCycle: registrationData.billingCycle,
        email: registrationData.email,
        username: registrationData.username,
        successUrl: `${window.location.origin}/register-success`,
        cancelUrl: `${window.location.origin}/register-cancel`,
      });

      if (sessionId && url) {
        localStorage.setItem("sessionId", sessionId);
        window.location.href = url;
      } else {
        setErrorMessage("Hubo un problema al crear la sesión de pago.");
      }
    } catch (err) {
      handleError(err);
    }
  }
};

// *************************************************************************************************************
  const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);

  const passwordRules = [
    { key: "minLength", text: "Longitud mínima de 5 caracteres" },
    { key: "uppercase", text: "Al menos una letra mayúscula" },
    { key: "number", text: "Al menos un número" },
    { key: "specialChar", text: "Al menos un carácter especial (!@#$%^&*)" },
  ];

  useEffect(() => {
    const validPlans = ['free', 'pro', 'premium'];
    const validBillings = ['monthly', 'annual'];

    const selectedPlan = searchParams.get("plan");
    const selectedBilling = searchParams.get("billing");

    if (selectedPlan && !validPlans.includes(selectedPlan)) {
      setErrorMessage('El plan seleccionado es incorrecto. Debe ser uno de los siguientes: free, pro, premium.');
      setSuccessMessage('');
    } else if (selectedPlan) {
      setRegistrationData((prevData) => ({
        ...prevData,
        plan: selectedPlan,
      }));
      setErrorMessage('');
    }

    if (selectedBilling && !validBillings.includes(selectedBilling)) {
      setErrorMessage('El tipo de facturación seleccionado es incorrecto. Debe ser uno de los siguientes: monthly, annual.');
      setSuccessMessage('');
    } else if (selectedBilling) {
      setRegistrationData((prevData) => ({
        ...prevData,
        billingCycle: selectedBilling,
      }));
      setErrorMessage('');
    }

  }, [searchParams, errorMessage]); 
  
  return (
    <AuthLayout
      title="Registrarse"
      borderSrc={border}
      imageSrc={avatar}
      onSubmit={handleSubmit}
      className="mt-16 md:mt-5 lg:w-[70%] relative"
      formContent={
        <>
          <article className="flex flex-col-reverse md:flex-row w-full gap-2">
            <span className="w-full">
              <Input
                label={"Nombre de Usuario"}
                type="text"
                id="username"
                value={registrationData.username}
                onChange={handleChange}
                icon={<FaRegUser />}
                required
              />
            </span>
            <span className="w-full md:w-[70%] flex items-end p-0">
              <Input
                label={"Plan"}
                type="text"
                id="plan"
                value={`${registrationData?.plan || "free"} - ${registrationData?.billingCycle || "monthly"}`}
                className="rounded-r-none w-[14.1rem] md:w-full"
                readOnly
                required
              />
              <Button
                label="Cambiar"
                onClick={() => setModalOpen(true)}
                className="h-[2.6rem] m-0 px-4 md:px-2 text-xs rounded-none rounded-r-lg inputStyle items-center hover:brightness-125"
                variant="secondary"
              />
            </span>
          </article>
            <Input
              label={"Correo electrónico"}
              id="email"
              type="email"
              value={registrationData.email}
              onChange={handleChange}
              required
              icon={<MdAlternateEmail />}
            />
          <div className="relative flex flex-col md:flex-row gap-2 w-full">
            <PasswordInput
              label={"Contraseña"}
              id="password"
              value={registrationData.password}
              onChange={handleChange}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => {
                if (allRequirementsMet) {
                  setPasswordFocused(false);
                }
              }}
              className="w-full"
              required
            />
            {/* password rules on screen ************************************* */}
            <ul
              className={`col-span-2 absolute text-sm mt-3 md:mt-3 transition-all duration-300 top-16 w-full px-2 py-1 md:py-1 z-10  bg rounded-b-lg shadow-md opacity-100
              ${
                passwordFocused || (passwordChecked && !allRequirementsMet)
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
                      passwordRequirements[key]
                        ? "text-green-500"
                        : "text-red-500"
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
              value={registrationData.confirmPassword}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <section className="flex flex-col md:flex-row text-xs my-4">
            <article className="flex flex-row">
              <Input
                id="accept-terms"
                type="checkbox"
                label="Acepto los"
                checked={conditionsChecked}
                onChange={handleCheckboxChange}
                className="mt-0"
                required
              />
              <strong>
                <Button
                  label="Términos y Condiciones"
                  variant="link"
                  onClick={() => navigate("/conditions")}
                  className="ml-1 mt-2"
                />
              </strong>
            </article>
            <article className="flex flex-row ml-5 md:ml-0 mt-2">
              <span className="mx-1">y la</span>
              <strong>
                <Button
                  label="Política de Privacidad"
                  variant="link"
                  onClick={() => navigate("/privacy")}
                />
              </strong>
            </article>

          </section>

          <article
            className={`flex flex-col-reverse md:flex-row justify-between items-center rounded-md text-sm md:pl-2 w-full ${
              error || errorMessage ? " bg-red-100 w-full" : ""
            } ${successMessage ? " bg-green-100 " : ""} `}
          >
            <span>
              {error || errorMessage && (
                <p className=" text-red-700">{errorMessage}</p>
              )}
              {successMessage && (
                <p className=" text-green-700">{successMessage}</p>
              )}
              </span>
              <span className="w-full md:w-auto">
              <SubmitButton
                label="Registrarse"
                loading={loading}
                className="z-[2] w-full md:w-auto" 
              /></span>
          </article>

          <section className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-baseline w-full border-t-2 mt-5">
            <span className="labelInput">¿Ya tienes una Cuenta?</span>
            <span className="">
              <Button
                label="Inicia Sesión"
                variant="link"
                onClick={() => navigate("/login")}
                className="font-bold mt-5 md:ml-1"
              />
            </span>
          </section>
        <PricingModal isOpen={modalOpen} closeModal={() => setModalOpen(false)} handlePlanSelect={handlePlanSelect}/>
        </>
      }
      />
  );
};

export default Register;

// card space   *******************************************************************
// <div className="">
// <label>Detalles de la tarjeta</label>
// <CardElement options={{ hidePostalCode: true }} />
// </div>
// ********************************************************************************
