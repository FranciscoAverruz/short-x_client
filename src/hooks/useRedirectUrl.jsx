import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "@src/Env.jsx";

const useRedirectUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const redirectToOriginalUrl = async (shortId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BACKEND_URL}/${shortId}`);

      if (response.data.originalUrl) {
        window.location.href = response.data.originalUrl;
      } else {
        throw new Error("URL no encontrada");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al redirigir");
    } finally {
      setLoading(false);
    }
  };

  return { redirectToOriginalUrl, loading, error };
};

export default useRedirectUrl;
