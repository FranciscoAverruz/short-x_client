import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useRedirectUrl from "@hooks/useRedirectUrl.jsx";

const RedirectHandler = () => {
  const { shortId } = useParams();
  const { redirectToOriginalUrl } = useRedirectUrl();

  useEffect(() => {
    if (shortId) {
      redirectToOriginalUrl(shortId);
    }
  }, [shortId, redirectToOriginalUrl]);

  return <p>Redirigiendo...</p>;
};

export default RedirectHandler;
