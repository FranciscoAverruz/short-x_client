import useAuthAxios from "@hooks/useAuthAxios";
import { API_URL } from "@src/Env.jsx";
import { AuthContext } from "@context/AuthContext";
import { useContext, useState } from "react";

const useShortenUrlForUser = () => {
  const [link, setLink] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [customId, setCustomId] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(AuthContext);

  const authAxios = useAuthAxios();

  const shortenUrl = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authAxios.post(
        `${API_URL}/user/${userId}/urls/shorten`,
        {
          originalUrl: link,
          customId: customId || null,
        }
      );

      setShortenedUrl(response.data.data.shortId);
      setLink("");
      setCustomId("");
    } catch (err) {
      setError(err.response?.data?.error || "Error al acortar la URL");
    } finally {
      setLoading(false);
    }
  };

  return {
    link,
    setLink,
    shortenedUrl,
    error,
    loading,
    shortenUrl,
    setShortenedUrl,
    originalUrl,
    setOriginalUrl,
    customId,
    setCustomId,
  };
};

export default useShortenUrlForUser;
