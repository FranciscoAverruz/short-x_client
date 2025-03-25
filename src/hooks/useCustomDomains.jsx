import { useState, useEffect, useCallback, useContext } from "react";
import { API_URL } from "@src/Env.jsx";
import { logError } from "@utils/logger";
import { AuthContext } from "@context/AuthContext";
import useAuthAxios from "@hooks/useAuthAxios";

const useCustomDomains = () => {
  const { userId } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const authAxios = useAuthAxios();

  const fetchDomains = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authAxios.get(
        `${API_URL}/user/${userId}/custom-domains`
      );
      setDomains(response.data);
    } catch (error) {
      logError("Error al obtener los dominios personalizados.");
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [authAxios, userId]);

  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  return { domains, loading, error, refetch: fetchDomains };
};

export default useCustomDomains;
