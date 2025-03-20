import axios from "axios";
import { API_URL } from "@src/Env.jsx";
import { useState } from "react";
import { logError } from "@utils/logger";

const useCheckoutSession = () => {
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [errorCheckout, setErrorCheckout] = useState(null);

  const createCheckoutSession = async (data) => {
    setLoadingCheckout(true);
    setErrorCheckout(null);

    try {
      const response = await axios.post(`${API_URL}/checkout-session`, {
        plan: data.plan,
        billingCycle: data.billingCycle,
        email: data.email,
        username: data.username,
      });

      if (response.data.sessionId && response.data.url) {
        return {
          sessionId: response.data.sessionId,
          url: response.data.url,
        };
      } else {
        throw new Error("No se recibió sessionId o url.");
      }
    } catch (err) {
      logError("Error al crear la sesión de checkout:", err);
      setErrorCheckout("Hubo un error al procesar tu pago.");
      throw err;
    } finally {
      setLoadingCheckout(false);
    }
  };

  return {
    createCheckoutSession,
    loadingCheckout,
    errorCheckout,
  };
};

export default useCheckoutSession;
