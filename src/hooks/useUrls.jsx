import axios from "axios";
import { logError } from "@utils/logger";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

const useUrls = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId, token } = useContext(AuthContext);

  useEffect(() => {
    if (!userId) return;

    const fetchUrls = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/user/${userId}/urls`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUrls(response.data.urls);
      } catch (err) {
        setError(err.message);
        logError("Error fetching URLs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [userId, token]);

  return { urls, loading, error };
};

export default useUrls;
