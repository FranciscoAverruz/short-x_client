/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import Input from "@molecules/Input.jsx";
import Button from "@atoms/Button.jsx";
import PlanLabel from "@dashCommon/PlanLabel.jsx";
import AuthLayout from "@auth/AuthLayout";
import useRegister from "@hooks/useRegister.jsx";
import PricingModal from "@common/PricingModal";
import SubmitButton from "@molecules/SubmitButton.jsx";
import useCheckoutSession from "@hooks/useCheckoutSession.jsx";
import PasswordValidation from "@dashCommon/PasswordValidation";
import { toast } from "sonner";
import { FaRegUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RegisterContext } from "@context/RegisterContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const Register = () => {
  const [searchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [conditionsChecked, setConditionsChecked] = useState(false);
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = passwords;
  const passwordInfo = {
    length: password.length,
    match: password.length > 0 && password === confirmPassword,
  };
  const { registrationData, setRegistrationData } = useContext(RegisterContext);
  const { createCheckoutSession } = useCheckoutSession();
  const { registerUser, loading, error } = useRegister();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "password" || id === "confirmPassword") {
      setPasswords((prev) => ({
        ...prev,
        [id]: value,
      }));

      if (id === "password" && !passwordChecked && value.length > 0) {
        setPasswordChecked(true);
      }
    } else {
      setRegistrationData((prev) => ({
        ...prev,
        [id]: value,
      }))
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
  // HANDLE SUBMIT *********************************************************************************************************
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedPlan = registrationData.plan ? registrationData.plan : "free";
    const selectedBillingCycle = registrationData.billingCycle
      ? registrationData.billingCycle
      : "monthly";

    const fullPlan = `${selectedPlan}_${
      selectedBillingCycle === "monthly" ? "monthly" : "annual"
    }`;

    if (!conditionsChecked) {
      toast.warning(
        "Debes aceptar los términos y condiciones para registrarte."
      );
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{5,}$/;
    if (!passwordRegex.test(passwords.password)) {
      toast.warning("La contraseña no cumple con los requisitos.");
      return;
    }

    if (!passwordInfo.match) {
      toast.warning("Las contraseñas no coinciden");
      return;
    }

    const dataToSend = {
      username: registrationData.username,
      email: registrationData.email,
      password: passwords.password,
      confirmPassword: passwords.confirmPassword,
      plan: fullPlan,
      billingCycle: selectedBillingCycle,
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

    if (dataToSend.plan.startsWith("free")) {
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
    } else if (
      registrationData.plan === "pro" || registrationData.plan === "premium"
    ) {
      try {
        sessionStorage.setItem("userData", JSON.stringify(dataToSend));
        sessionStorage.setItem("selectedPlan", fullPlan);

        const { sessionId, url } = await createCheckoutSession({
          plan: fullPlan,
          billingCycle: registrationData.billingCycle,
          email: registrationData.email,
          username: registrationData.username,
          successUrl: `${window.location.origin}/register-success`,
          cancelUrl: `${window.location.origin}/register-cancel`,
        });

        if (sessionId && url) {
          sessionStorage.setItem("sessionId", sessionId);
          window.location.href = url;
        } else {
          setErrorMessage("Hubo un problema al crear la sesión de pago.");
        }
      } catch (err) {
        handleError(err);
      }
    }
  };
// ////******************************************* */
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => navigate("/login"), 3000);
    }
  }, [successMessage, navigate]);

  useEffect(() => {
    const validPlans = ["free", "pro", "premium"];
    const validBillings = ["monthly", "annual"];

    const selectedPlan = searchParams.get("plan");
    const selectedBilling = searchParams.get("billing");

    if (selectedPlan && !validPlans.includes(selectedPlan)) {
      setErrorMessage(
        "El plan seleccionado es incorrecto. Debe ser uno de los siguientes: free, pro, premium."
      );
      setSuccessMessage("");
    } else if (selectedPlan) {
      setRegistrationData((prevData) => ({
        ...prevData,
        plan: selectedPlan,
      }));
      setErrorMessage("");
    }

    if (selectedBilling && !validBillings.includes(selectedBilling)) {
      setErrorMessage(
        "El tipo de facturación seleccionado es incorrecto. Debe ser uno de los siguientes: monthly, annual."
      );
      setSuccessMessage("");
    } else if (selectedBilling) {
      setRegistrationData((prevData) => ({
        ...prevData,
        billingCycle: selectedBilling,
      }));
      setErrorMessage("");
    }
  }, [searchParams, errorMessage, setRegistrationData]);

  const currentPlanValue = `${registrationData?.plan || "free"}_${
    registrationData?.billingCycle || "monthly"
  }`;
  return (
    <AuthLayout
      title="Registrarse"
      formContent={
        <form onSubmit={handleSubmit}>
          <article className="flex flex-col-reverse md:flex-row w-full gap-2">
            <section className="w-full">
              <Input
                label={"Nombre de Usuario"}
                type="text"
                id="username"
                value={registrationData.username}
                onChange={handleChange}
                icon={<FaRegUser />}
                required
              />
            </section>
            <aside className="md:w-[70%] flex items-end p-0">
              <span className="relative w-full">
                <Input
                  label={"Plan"}
                  type="text"
                  id="plan"
                  value={currentPlanValue}
                  className="rounded-r-none w-full text-transparent "
                  style={{ textIndent: "-9999px" }}
                  readOnly
                  required
                />
                <span className="absolute left-4 top-10 transform text-amber-500 font-semibold text-lg">
                  <PlanLabel plan={currentPlanValue} />
                  {/* this will show over id="newPlan" */}
                </span>
              </span>

              <Button
                label="Cambiar"
                onClick={() => setModalOpen(true)}
                className=" h-[2.6rem] m-0 px-4 md:px-2 text-xs rounded-none rounded-r-lg inputStyle items-center hover:brightness-125 shadow-md shadow-slate-500/80 dark:shadow-slate-950 z-50"
                variant="secondary"
              />
            </aside>
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

          <PasswordValidation
            password={passwords.password}
            confirmPassword={passwords.confirmPassword}
            onPasswordChange={handleChange}
            onConfirmPasswordChange={handleChange}
            passwordChecked={passwordChecked}
            passwordInfo={passwordInfo}
          />

          <section className="flex flex-col md:flex-row text-xs my-4">
            <article className="flex flex-row">
              <Input
                id="accept-terms"
                type="checkbox"
                label="Acepto los"
                checked={conditionsChecked}
                onChange={handleCheckboxChange}
                className="mt-0 ml-3"
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
              <span className="mx-1 grlTxt">y la</span>
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
              {error ||
                (errorMessage && (
                  <p className=" text-red-700">{errorMessage}</p>
                ))}
              {successMessage && (
                <p className=" text-green-700">{successMessage}</p>
              )}
            </span>
            <span className="w-full md:w-auto">
              <SubmitButton
                label="Registrarse"
                loading={loading}
                disabled={loading || !passwordInfo.match}
                className="z-[2] w-full md:w-auto p-3"
              />
            </span>
          </article>

          <section className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-baseline w-full border-t-2 mt-5 pt-5 md:pt-0">
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
          <PricingModal
            isOpen={modalOpen}
            closeModal={() => setModalOpen(false)}
            handlePlanSelect={handlePlanSelect}
          />
        </form>
      }
    />
  );
};

export default Register;
