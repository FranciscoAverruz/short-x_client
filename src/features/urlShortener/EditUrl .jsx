/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useContext } from "react";
import Input from "@molecules/Input.jsx";
import Button from "@atoms/Button.jsx";
import SubmitButton from "@molecules/SubmitButton.jsx";
import useAuthAxios from "@hooks/useAuthAxios";
import { toast } from "sonner";
import { API_URL } from "@src/Env.jsx";
import { TbCancel } from "react-icons/tb";
import { logError } from "@utils/logger";
import { AuthContext } from "@context/AuthContext";
import { FRONTEND_URL } from "@src/Env.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EditUrl = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authAxios = useAuthAxios();
  const { userId } = useContext(AuthContext);
  const { shortId } = useParams();
  const [loading, setLoading] = useState(false);
  const [domains, setDomains] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    originalUrl: "",
    shortId: "",
    customDomain: "",
    id: "",
  });

  const fetchUrlData = useCallback(async () => {
    try {
      const response = await authAxios.get(`${API_URL}/urls/${shortId}`);
      setFormData({
        originalUrl: response.data.originalUrl,
        shortId: response.data.shortId || "",
        customDomain: response.data.customDomain || "",
        id: response.data.id || "",
      });
    } catch (error) {
      toast.error("Error al cargar los datos de la URL.");
      navigate("/dashboard/urls");
    }
  }, [shortId, navigate, authAxios]);

  const fetchDomains = useCallback(async () => {
    try {
      const response = await authAxios.get(
        `${API_URL}/user/${userId}/custom-domains`
      );
      setDomains(response.data);
    } catch (error) {
      logError("Error al obtener los dominios personalizados.");
    }
  }, [authAxios, userId]);

  useEffect(() => {
    if (location.state.urlData) {
      setFormData({
        originalUrl: location.state.urlData.originalUrl,
        shortId: location.state.urlData.shortLink,
        customDomain: location.state.urlData.customDomain || "",
        id: location.state.urlData.id || "",
      });
    } else {
      fetchUrlData();
    }
    fetchDomains();
  }, [location, fetchUrlData, fetchDomains]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const submittedData = {
      ...formData,
      customDomain: formData.customDomain === "" ? null : formData.customDomain,
    };
    try {
      await authAxios.put(
        `${API_URL}/user/${userId}/urls/${shortId}`,
        submittedData
      );
      toast.success("URL actualizada con éxito.");
      navigate("/dashboard/urls");
    } catch (error) {
      logError("❌ Error en la actualización:", error);

      if (error.response && error.response.data?.errorCode) {
        const errorMessages = {
          INVALID_ID: "El ID proporcionado no es válido.",
          DUPLICATE_URL: "El shortId y el dominio ya están en uso.",
          URL_NOT_FOUND: "No se encontró la URL.",
          VALIDATION_ERROR: "Los datos ingresados no son válidos.",
          SERVER_ERROR:
            "Error interno del servidor. Inténtalo de nuevo más tarde.",
        };

        const message =
          errorMessages[error.response.data.errorCode] ||
          "Ocurrió un error inesperado.";
        setErrorMessage(message);
        toast.error(message);
      } else {
        setErrorMessage("Ocurrió un error inesperado.");
        toast.error("Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Editar URL</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="URL Original"
          type="text"
          name="originalUrl"
          value={formData.originalUrl}
          onChange={handleChange}
          required
        />

        <Input
          label="Identificador Corto"
          type="text"
          name="shortId"
          value={formData.shortId}
          onChange={handleChange}
          required
        />

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Dominio Personalizado
          </label>
          <select
            name="customDomain"
            value={formData.customDomain}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-indigo-300"
          >
            <option value="">{FRONTEND_URL}</option>
            {domains.map((domain) => (
              <option key={domain._id} value={domain._id}>
                {domain.domain}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <Button
            label="Cancelar"
            icon={TbCancel}
            onClick={() => navigate("/dashboard/urls")}
            variant="secondary"
          />
          <SubmitButton label="Guardar Cambios" loading={loading} />
        </div>

        {errorMessage && (
          <div className="mt-4 p-2 text-red-700 bg-red-100 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default EditUrl;
