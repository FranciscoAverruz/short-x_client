/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "@src/Env.jsx";
import UrlInfo from "@dashCommon/UrlInfo";
import { AuthContext } from "@context/AuthContext";
import { Loader } from "@common/Loader.jsx";
import useAuthAxios from "@hooks/useAuthAxios";
import useUrlActions from "@hooks/useUrlActions";
import ConfirmModal from "@dashCommon/ConfirmModal.jsx";

const UrlDetails = () => {
  const { shortId } = useParams();
  const authAxios = useAuthAxios();
  const { userId, plan } = useContext(AuthContext);
  const navigate = useNavigate();
  const [urlData, setUrlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUrls, setSelectedUrls] = useState([]);

  const fetchUrlDetails = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await authAxios.get(`${API_URL}/user/${userId}/stats/${shortId}`);
      setUrlData(response.data);
    } catch (error) {
      console.error("Error al obtener detalles de la URL:", error);
    } finally {
      setLoading(false);
    }
  }, [authAxios, shortId, userId]);

  useEffect(() => {
    fetchUrlDetails();
  }, [fetchUrlDetails]);

  const {
    loadingAction,
    confirmModal,
    closeConfirmModal,
    handleDeleteMultiple,
    openConfirmModal
  } = useUrlActions(setUrlData, setSelectedUrls, selectedUrls, fetchUrlDetails, shortId);

  const handleSelectForDeletion = () => {
    setSelectedUrls([shortId]);
    openConfirmModal();
  };

  const handleDeleteAndRedirect = async () => {
    await handleDeleteMultiple();
    navigate("/dashboard/urls");
  };

  const handleCloseConfirmModal = () => {
    setSelectedUrls([]);
    closeConfirmModal();
  };

  if (loading) return <Loader type="spinner" />;
  if (!urlData) return <p>No se encontró la URL.</p>;

  return (
    <div className="mx-auto p-4 max-w-7xl">
      <h1 className="text-2xl font-bold mb-4">Detalles de la URL</h1>

      <UrlInfo
        urlsStats={[urlData]}
        selectedUrls={selectedUrls}
        setSelectedUrls={setSelectedUrls}
        expiresAt={urlData.expiresAt}
      />

      <section className="mt-5 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">📊 Estadísticas detalladas</h2>
        <p><strong>📱 Clicks desde móviles:</strong> {urlData.mobileClicks}</p>
        <p><strong>💻 Clicks desde escritorio:</strong> {urlData.desktopClicks}</p>
        <p>{plan}</p>

        {plan?.startsWith("pro") && urlData.locationsCount && (
          <div className="mt-3">
            <h3 className="text-md font-semibold">🌍 Clics por país:</h3>
            <ul className="list-disc pl-5">
              {Object.entries(urlData.locationsCount).map(([country, clicks]) => (
                <li key={country}>
                  <strong>{country}:</strong> {clicks} clics
                </li>
              ))}
            </ul>
          </div>
        )}

        {plan?.startsWith("premium") && urlData.locationsWithDevices && (
          <div className="mt-3">
            <h3 className="text-md font-semibold">🌍📱 Clics detallados por país y dispositivo:</h3>
            {Object.entries(urlData.locationsWithDevices).map(([country, devices]) => (
              <div key={country} className="mt-2 p-2 border rounded bg-white dark:bg-gray-700">
                <h4 className="font-semibold">{country}</h4>
                <ul className="list-disc pl-5">
                  {Object.entries(devices).map(([device, count]) => (
                    <li key={device}>
                      <strong>{device}:</strong> {count} clics
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSelectForDeletion}
          className="mt-4 bg-red-500 text-white p-2 rounded"
        >
          Eliminar URL
        </button>
      </section>

      <ConfirmModal
        open={confirmModal.isOpen}
        onClose={handleCloseConfirmModal}
        title="Confirmar eliminación"
        content="¿Estás seguro de que deseas eliminar esta URL? Esta acción no se puede deshacer."
        onConfirm={handleDeleteAndRedirect}
        loading={loadingAction}
      />
    </div>
  );
};

export default UrlDetails;
