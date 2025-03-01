// src/hooks/useRegister.js
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '@src/Env.jsx';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (registrationData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/signup`, registrationData);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError('Error al registrar usuario');
      throw err;
    }
  };

  return { registerUser, loading, error };
};

export default useRegister;