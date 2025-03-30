import Sx from "@common/Sx.jsx";
// import logo from "@assets/icon.png";
import AuthLayout from "@auth/AuthLayout";

import axios from "axios";
import { API_URL } from "@src/Env.jsx";
import { logError } from "@utils/logger";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Success() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    const storedSelectedPlan = sessionStorage.getItem("selectedPlan");
    const sessionId = sessionStorage.getItem("sessionId");

    if (sessionId && storedUserData && storedSelectedPlan) {
      const userData = JSON.parse(storedUserData);
      const selectedPlan = storedSelectedPlan;

      const dataToSend = {
        sessionId,
        userData,
        selectedPlan,
      };

      axios
        .post(`${API_URL}/verify-payment`, dataToSend)
        .then((response) => {
          if (response.data.success) {
            sessionStorage.removeItem("userData");
            sessionStorage.removeItem("selectedPlan");
            sessionStorage.removeItem("sessionId");

            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else {
            logError("El pago no fue exitoso.");
            setError("El pago no fue exitoso. Por favor, inténtalo de nuevo.");
          }
        })
        .catch((error) => {
          logError("Error al verificar el pago:", error);
          setError("Ocurrió un error al verificar el pago.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Faltan datos requeridos para verificar el pago.");
      setLoading(false);
    }
  }, [error, navigate]);
  return (
    <main className="w-screen h-screen flex justify-center items-start">
    <AuthLayout
      formContent={
        <section className="flex flex-col items-center justify-center text-center">
          {loading && (
            <div className="bg flex flex-col items-center justify-center">
              <h1 className="title text-3xl font-bold ">
                Verificando el pago...
              </h1>
              <span className="text-5xl my-5">💳</span>
              <p className="subTitle1">
                Estamos procesando tu pago, por favor espera un momento.
              </p>
            </div>
          )}
          

          {error && (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold text-red-600">Error</h1>
              <span className="text-5xl my-5">❌</span>
              <p className="smart">{error}</p>
            </div>
          )}

          {!error && !loading && (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold text-green-600">
                ¡Pago exitoso!
              </h1>
              <span className="text-5xl my-5">🎉</span>
              <p className="smart">
                Ahora debes hacer Login para empezar a disfrutar de los
                beneficios de
              </p>
              <Sx className="smart" />
            </div>
          )}
        </section>
      }
    />
    </main>
  );
}

export default Success;
