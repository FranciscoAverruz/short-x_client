import { useState, useRef, useCallback } from "react";
import { BACKEND_URL } from "@src/Env.jsx";
import axios from "axios";

const useRedirectUrl = () => {
  const [loading, setLoading] = useState(false);
  const hasRegisteredClick = useRef(false);

  const redirectToOriginalUrl = useCallback(async (shortId) => {
    if (hasRegisteredClick.current) return;
    hasRegisteredClick.current = true;

    setLoading(true);

    try {
      const response = await axios.get(
        `${BACKEND_URL}/${shortId}/register-click`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data?.originalUrl) {
        window.location.href = response.data.originalUrl;
      } else {
        console.warn( "No se recibió la URL de destino. Redirigiendo por fallback..." );
        window.location.href = `${BACKEND_URL}/${shortId}`;
      }
    } catch (error) {
      console.warn( "No se pudo registrar el clic, pero se continuará con la redirección.", error );
      window.location.href = `${BACKEND_URL}/${shortId}`;
    } finally {
      setLoading(false);
    }
  }, []);

  return { redirectToOriginalUrl, loading };
};

export default useRedirectUrl;
