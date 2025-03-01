import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "@src/Env.jsx";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials, rememberMe, dispatch) => {
    setLoading(true);
    setError(null);
  
    try {
      const res = await axios.post(`${API_URL}/login`, credentials);
      const userData = res.data;
  
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: userData, rememberMe },
      });
  
      navigate("/dashboard");
    } catch (err) {
      let errorMessage = "Error desconocido";
      if (err.response) {
        errorMessage = err.response.data?.message || "Credenciales incorrectas";
      } else if (err.request) {
        errorMessage = "No se recibió respuesta del servidor.";
      } else {
        errorMessage = "Error al intentar iniciar sesión.";
      }

      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error
  };
};

export default useLogin;
