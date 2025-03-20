import axios from "axios";
import { API_URL } from "@src/Env.jsx";
import { useState } from "react";
import { logError } from "@utils/logger";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (registrationData) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/signup`, registrationData);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      logError("Error en el registro:", err.response?.data || err.message);
      setError("Error al registrar usuario");
      throw err;
    }
  };

  return { registerUser, loading, error };
};

export default useRegister;
