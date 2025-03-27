/* eslint-disable no-unused-vars */
import { API_URL } from "@src/Env.jsx";
import { logError } from "@utils/logger";
import React from "react";
import axios from "axios";
import EmailForm from "@layouts/EmailForm.jsx";
import AuthLayout from "@auth/AuthLayout";

const Contact = () => {
  const handleEmailSubmit = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/send-email`, formData);
      console.log(response);
    } catch (error) {
      logError("Error sending the message", error);
      throw new Error("Error sending the message");
    }
  };

  return (
    <AuthLayout
      title="Déjanos un mensaje"
      onSubmit={handleEmailSubmit}
      formContent={<EmailForm onSubmit={handleEmailSubmit} />}
    />
  );
};

export default Contact;
