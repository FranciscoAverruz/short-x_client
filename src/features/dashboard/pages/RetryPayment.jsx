import { logError } from "@utils/logger";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_KEY } from "@src/Env.jsx";

const RetryPayment = () => {
  const { session_id } = useParams();

  useEffect(() => {
    const redirectToCheckout = async () => {
      try {
        const stripe = await loadStripe(STRIPE_KEY);

        if (!stripe) {
          logError("Error al cargar la librería de Stripe.");
          return;
        }

        const { error } = await stripe.redirectToCheckout({
          sessionId: session_id,
        });

        if (error) {
          logError("Error al redirigir a Stripe:", error);
        }
      } catch (error) {
        logError("Error al intentar redirigir:", error);
      }
    };

    redirectToCheckout();
  }, [session_id]);

  return <div>Redirigiendo a Stripe...</div>;
};

export default RetryPayment;
