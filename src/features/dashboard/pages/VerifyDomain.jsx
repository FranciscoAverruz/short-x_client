/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthAxios from "@hooks/useAuthAxios";
import { AuthContext } from "@context/AuthContext";
import { API_URL } from "@src/Env.jsx"

const VerifyDomain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authAxios = useAuthAxios();
  const { userId } = useContext(AuthContext);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  const verifyDomain = useCallback(async (token, domain) => {
    if (!authAxios || !userId) {
      setStatus("error");
      setMessage("Debes iniciar sesión para verificar tu dominio.");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    try {
      const response = await authAxios.post(
        `${API_URL}/user/${userId}/custom-domains/verify`,
        { token, domain }
      );

      if (response.status === 200) {
        setStatus("success");
        setMessage("Dominio verificado correctamente.");
        setTimeout(() => navigate("/dashboard/domains"), 3000);
      } else {
        setStatus("error");
        setMessage(response.data.message || "Error en la verificación.");
      }
    } catch (error) {
      setStatus("error");
      setMessage(error.response?.data?.message || "Hubo un error.");
    }
  }, [authAxios, navigate, userId]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const domain = params.get("domain");

    console.log("Token recibido:", token);
    console.log("Dominio recibido:", domain);

    if (token && domain) {
      verifyDomain(token, domain);
    } else {
      setStatus("error");
      setMessage("Faltan parámetros en la URL.");
    }
  }, [location.search, verifyDomain]);

  return (
    <div>
      <h2>Verificación de Dominio</h2>
      <p>{message}</p>
      {status === "error" && (
        <p>Si no iniciaste sesión, serás redirigido a la página de login.</p>
      )}
    </div>
  );
};

export default VerifyDomain;
