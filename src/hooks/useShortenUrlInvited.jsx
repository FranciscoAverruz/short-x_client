import axios from "axios";
import { API_URL } from "@src/Env.jsx";
import { useState } from "react";

const useShortenUrlInvited = () => {
  const [link, setLink] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const shortenUrl = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/invited/shorten`, {
        originalUrl: link,
      });

      setShortenedUrl(`${response.data.shortUrl}`);
      setLink("");
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
  };
};

export default useShortenUrlInvited;
