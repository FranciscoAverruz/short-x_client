/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from 'react';

const FormDataContext = createContext();

const FormDataProvider = ({ children }) => {
  
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [countryCode, setCountryCode] = useState("ES")
  const [countryName, setCountryName] = useState("")
  const [flag, setFlag] = useState("")
  const [selectedPrefixCont, setSelectedPrefixCont] = useState("+34")

  const [formData, setFormData] = useState({
    name: name,
    phone: phone,
    email: email,
    message: message,
    countryCode: countryCode,
    countryName: countryName,
    flag: flag,
    selectedPrefixCont: selectedPrefixCont
  });

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
      countryCode: "ES",
      countryName: "",
      flag: "",
      selectedPrefixCont: "+34"
    });
  };

  return (
    <FormDataContext.Provider value={{ formData, setFormData, resetForm, name, setName, phone, setPhone, email, setEmail, message, setMessage, countryCode, setCountryCode, countryName, setCountryName, flag, setFlag, selectedPrefixCont, setSelectedPrefixCont}}>
      {children}
    </FormDataContext.Provider>
  );
};

export  {FormDataProvider, FormDataContext}
