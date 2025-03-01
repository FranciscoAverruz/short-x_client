import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "@src/Env.jsx";
import Sx from "@common/Sx.jsx";
import logo from "@assets/icon.png";

function Success() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const storedSelectedPlan = localStorage.getItem("selectedPlan");
    const sessionId = localStorage.getItem("sessionId");

    if (sessionId && storedUserData && storedSelectedPlan) {
      console.log("Pago exitoso. Session ID:", sessionId);

      const userData = JSON.parse(storedUserData);
      const selectedPlan = storedSelectedPlan;

      const dataToSend = {
        sessionId,
        userData,
        selectedPlan,
      };

      console.log("dataToSend desde success ==== ", dataToSend);

      axios
        .post(`${API_URL}/verify-payment`, dataToSend)
        .then((response) => {
          if (response.data.success) {
            console.log("Pago verificado correctamente.");

            localStorage.removeItem("userData");
            localStorage.removeItem("selectedPlan");
            localStorage.removeItem("sessionId");

            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else {
            console.error("El pago no fue exitoso.");
            setError("El pago no fue exitoso. Por favor, inténtalo de nuevo.");
          }
        })
        .catch((error) => {
          console.error("Error al verificar el pago:", error);
          setError("Ocurrió un error al verificar el pago.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Faltan datos requeridos para verificar el pago.");
      setLoading(false);
    }
  }, [navigate]);

  return (
    <main className="bg flex flex-col lg:flex-row items-center justify-center h-screen gap-10">
      <section className="flex flex-col items-center justify-center gap-5 border-b-2 lg:border-b-0 lg:border-r-2 pb-10 lg:pb-0 lg:pr-10">
        <img src={logo} alt="Logo" className="w-28 h-28 aspect-square" />
        <article className="flex flex-col items-center lg:gap-2 md:mb-0">
          <Sx className="text-4xl -mb-3" />
          <p className="smart">Your Smart Link Shortener</p>
        </article>
      </section>
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
              Ahora debes hacer Login para empezar a disfrutar de los beneficios
              de
            </p>
            <Sx className="smart" />
          </div>
        )}
      </section>
    </main>
  );
}

export default Success;