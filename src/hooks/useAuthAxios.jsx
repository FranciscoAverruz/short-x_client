import { useContext, useMemo } from "react";
import axios from "axios";
import { AuthContext } from "@context/AuthContext";

const useAuthAxios = () => {
  const { user } = useContext(AuthContext);
  const token = user?.token;

  const authAxios = useMemo(() => {
    return axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  return authAxios;
};

export default useAuthAxios;

