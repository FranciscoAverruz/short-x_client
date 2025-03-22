import { useState } from "react";
import { BACKEND_URL } from "@src/Env.jsx";

const useRedirectUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const redirectToOriginalUrl = async (shortId) => {
    setLoading(true);
    setError(null);
    try {
      window.location.href = `${BACKEND_URL}/${shortId}`;
    } catch (err) {
      setError(err.response?.data?.message || "Error al redirigir");
    } finally {
      setLoading(false);
    }
  };

  return { redirectToOriginalUrl, loading, error };
};

export default useRedirectUrl;
