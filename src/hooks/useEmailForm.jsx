/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useContext } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { FormDataContext } from "@context/FormDataContext.jsx";
import useCountries from "@hooks/useCountries.jsx";

const useEmailForm = (onSubmit) => {
  const {
    countryOptions,
    selectedPrefix,
    defaultCountryName,
    defaultCountryFlag,
  } = useCountries();

  const {
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    message,
    setMessage,
    countryCode,
    setCountryCode,
    countryName,
    setCountryName,
    flag,
    setFlag,
    selectedPrefixCont,
    setSelectedPrefixCont,
  } = useContext(FormDataContext);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const inputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "countryCode") {
      const selectedCountry = countryOptions.find(
        (option) => option.code === value
      );
      if (selectedCountry) {
        setCountryCode(value);
        setCountryName(selectedCountry.name);
        setFlag(selectedCountry.flag);
        setSelectedPrefixCont(selectedCountry.prefix);

        if (!phone.startsWith(selectedCountry.prefix)) {
          setPhone(`${selectedCountry.prefix}${phone.replace(/^\+\d+/g, "")}`);
        }
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    } else {
      if (name === "name") setName(value);
      if (name === "phone") setPhone(value);
      if (name === "email") setEmail(value);
      if (name === "message") setMessage(value);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys({ name, phone, email, message }).forEach((key) => {
      if (key !== "countryName" && !eval(key).trim()) {
        newErrors[key] = "mensaje requerido";
      }
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
      newErrors.email = "Email invalido";
    }

    if (phone) {
      const phoneNumber = parsePhoneNumberFromString(phone, countryCode);
      if (!phoneNumber || !phoneNumber.isValid()) {
        newErrors.phone = "Telefono Invalido";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setIsSuccess(false);
      return;
    }

    try {
      await onSubmit({ name, phone, email, message, countryName });
      setFeedbackMessage("mensaje enviado exitosamente");
      setIsSuccess(true);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setCountryCode("ES");
      setCountryName("");
      setSelectedPrefixCont("+34");
    } catch (error) {
      setFeedbackMessage("mensaje no enviado");
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    const selectedCountry = countryOptions.find(
      (option) => option.code === countryCode
    );

    if (selectedCountry) {
      setCountryName(selectedCountry.name);
      setFlag(selectedCountry.flag);
    }
  }, [countryOptions, countryCode, setCountryName, setFlag]);

  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        setFeedbackMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  return {
    name,
    phone,
    email,
    message,
    countryCode,
    countryName,
    flag,
    feedbackMessage,
    isSuccess,
    errors,
    handleChange,
    handleSubmit,
    inputRef,
    selectedPrefix,
    defaultCountryName,
    defaultCountryFlag,
    countryOptions,
  };
};

export default useEmailForm;
