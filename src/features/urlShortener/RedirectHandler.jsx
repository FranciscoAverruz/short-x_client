import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "@src/Env.jsx";

const RedirectHandler = () => {
  const { shortId } = useParams();

  useEffect(() => {
    console.log("Redirigiendo a:", `${BACKEND_URL}/${shortId}`);
    window.location.href = `${BACKEND_URL}/${shortId}`;
  }, [shortId]);

  return <p>Redirigiendo...</p>;
};

export default RedirectHandler;
