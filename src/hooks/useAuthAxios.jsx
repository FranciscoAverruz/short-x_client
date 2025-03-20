import axios from "axios";
import { AuthContext } from "@context/AuthContext";
import { useContext, useMemo } from "react";

const useAuthAxios = () => {
  const { user } = useContext(AuthContext);

  const token = user?.token;

  const authAxios = useMemo(() => {
    if (!token) return null;

    return axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  return authAxios;
};

export default useAuthAxios;
