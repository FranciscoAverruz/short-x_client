/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthAxios from "@hooks/useAuthAxios";
import { API_URL } from "@src/Env.jsx";
import UrlInfo from "@dashCommon/UrlInfo";
import { AuthContext } from "@context/AuthContext";
import { Loader } from "@common/Loader.jsx";

const UrlDetails = () => {
  const { shortId } = useParams();
  const authAxios = useAuthAxios();
  const [urlData, setUrlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUrls, setSelectedUrls] = useState([]);
  const { userId, plan } = useContext(AuthContext);

  useEffect(() => {
    const fetchUrlDetails = async () => {
      if (!userId) return;
      try {
        const response = await authAxios.get(`${API_URL}/user/${userId}/stats/${shortId}`);
        setUrlData(response.data);
      } catch (error) {
        console.error("Error fetching URL details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrlDetails();
  }, [shortId, authAxios, userId]);

  if (loading) return <Loader type="spinner" />;
  if (!urlData) return <p>No se encontró la URL.</p>;
  console.log("urlData UrlDetails ---- ", urlData); 

  return (
    <div className="mx-auto p-4 max-w-7xl">
      <h1 className="text-2xl font-bold mb-4">Detalles de la URL</h1>

      <UrlInfo 
        urlsStats={[urlData]} 
        selectedUrls={selectedUrls} 
        setSelectedUrls={setSelectedUrls}
        expiresAt= {urlData.expiresAt}
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
      </section>
    </div>
  );
};

export default UrlDetails;
