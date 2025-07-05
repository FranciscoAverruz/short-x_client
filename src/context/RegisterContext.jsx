/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";

const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    plan: "",
    billingCycle: "",
    paymentMethodId: "",
  });

  return (
    <RegisterContext.Provider value={{ registrationData, setRegistrationData }}>
      {children}
    </RegisterContext.Provider>
  );
};

export {RegisterContext, RegisterProvider}