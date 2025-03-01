import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useUrls = () => {
  const { userId, token } = useContext(AuthContext);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.error("Error fetching URLs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [userId, token]);

  return { urls, loading, error };
};

export default useUrls;
