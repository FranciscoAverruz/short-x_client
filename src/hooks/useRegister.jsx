import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '@src/Env.jsx';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (registrationData) => {
    if (loading) return; // Evita doble ejecución
    setLoading(true);
    console.log("⏳ Enviando datos de registro:", registrationData);
    try {
      const response = await axios.post(`${API_URL}/signup`, registrationData);
      console.log("cuenta creada")
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      console.error("Error en el registro:", err.response?.data || err.message); // 🔴 Muestra el error exacto del backend
      setError('Error al registrar usuario');
      throw err;
    }
  };

  return { registerUser, loading, error };
};

export default useRegister;