/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useCallback } from "react";
import Input from "@molecules/Input.jsx";
import Button from "@atoms/Button.jsx";
import SubmitButton from "@molecules/SubmitButton.jsx";
import useAuthAxios from "@hooks/useAuthAxios";
import { toast } from "sonner";
import { API_URL } from "@src/Env.jsx";
import { AuthContext } from "@context/AuthContext";

const Domains = () => {
  const { userId } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [domain, setDomain] = useState("");
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const authAxios = useAuthAxios();

  const fetchDomains = useCallback(async () => {
    try {
      const res = await authAxios.get(
        `${API_URL}/user/${userId}/custom-domains`
      );
      setDomains(res.data);
    } catch (err) {
      setError("Error fetching domains");
    }
  }, [authAxios, userId]);

  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  const handleAddDomain = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authAxios.post(`${API_URL}/user/${userId}/custom-domains`, {
        domain,
      });
      setDomain("");
      fetchDomains();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding domain");
    }
    setLoading(false);
  };

  const handleDeleteDomain = async (domainId) => {
    try {
      await authAxios.delete(
        `${API_URL}/user/${userId}/custom-domains/${domainId}`
      );
      fetchDomains();
    } catch (err) {
      setError("Error deleting domain");
    }
  };

  const handleVerifyDomain = async (customDomain) => {
    const token = prompt("Ingrese el token de verificación:");
    if (!token) return;
    try {
      await authAxios.post(`${API_URL}/user/${userId}/custom-domains/verify`, {
        domain: customDomain.domain,
        token,
      });
      fetchDomains();
      toast.success("Dominio verificado correctamente");
    } catch (err) {
      toast.error(
        "La verificación falló. Revise el token y vuelva a intentarlo."
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Gestionar Dominios Personalizados
      </h1>

      <form onSubmit={handleAddDomain} className="mb-6">
        <Input
          id="domain"
          name="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Ingrese su dominio personalizado"
          label="Dominio Personalizado"
          required
          errorMessage={error}
        />
        <SubmitButton label="Agregar Dominio" loading={loading} />
      </form>

      <div>
        {domains.length ? (
          <ul>
            {domains.map((d) => (
              <li
                key={d._id}
                className="flex items-center justify-between border border-gray-300 p-3 rounded mb-2"
              >
                <div>
                  <p className="font-medium">{d.domain}</p>
                  <p className="text-sm text-gray-500">
                    {d.verified ? "Verificado" : "No verificado"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {!d.verified && (
                    <Button
                      label="Verificar"
                      variant="action"
                      onClick={() => handleVerifyDomain(d)}
                      className="px-3 py-1"
                    />
                  )}
                  <Button
                    label="Eliminar"
                    variant="danger"
                    onClick={() => handleDeleteDomain(d._id)}
                    className="px-3 py-1"
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay dominios registrados.</p>
        )}
      </div>
    </div>
  );
};

export default Domains;
