/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "@src/Env.jsx";
import { AuthContext } from "@context/AuthContext";
import { Loader } from "@common/Loader.jsx";
import { FaMobileAlt } from "react-icons/fa";
import { GiLaptop } from "react-icons/gi";
import { IoReturnUpBack } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@atoms/Button.jsx";
import UrlInfo from "@dashCommon/UrlInfo";
import ConfirmModal from "@dashCommon/ConfirmModal.jsx";
import UrlDetailCard from "@dashCommon/UrlDetailCard.jsx";
import useAuthAxios from "@hooks/useAuthAxios";
import useUrlActions from "@hooks/useUrlActions";
import BarChart from "@dashCharts/BarChart";
import DoughnutChart from "@dashCharts/DoughnutChart";

const UrlDetails = () => {
  const navigate = useNavigate();
  const authAxios = useAuthAxios();
  const { shortId } = useParams();
  const { userId, plan } = useContext(AuthContext);
  const [urlData, setUrlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUrls, setSelectedUrls] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const fetchUrlDetails = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await authAxios.get(
        `${API_URL}/user/${userId}/stats/${shortId}`
      );
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    loadingAction,
    confirmModal,
    closeConfirmModal,
    handleDeleteMultiple,
    openConfirmModal,
  } = useUrlActions(
    setUrlData,
    setSelectedUrls,
    selectedUrls,
    fetchUrlDetails,
    shortId
  );

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

  const getDeviceChartData = (locationsWithDevices) => {
    const countries = Object.keys(locationsWithDevices);
    const mobileClicks = countries.map(
      (country) => locationsWithDevices[country].mobile || 0
    );
    const desktopClicks = countries.map(
      (country) => locationsWithDevices[country].desktop || 0
    );
    const mobileColor = isDarkMode ? "#26634f" : "#99f6e4";
    const desktopColor = isDarkMode ? "#3a2a56" : "#a78bfa";

    return {
      labels: countries,
      datasets: [
        {
          label: "Móviles",
          data: mobileClicks,
          backgroundColor: mobileColor,
          borderColor: "#2dd4bf",
          borderWidth: 1,
        },
        {
          label: "Ordenadores",
          data: desktopClicks,
          backgroundColor: desktopColor,
          borderColor: "#8b5cf6",
          borderWidth: 1,
        },
      ],
    };
  };

  const getProChartData = (locationsCount) => {
    const countries = Object.keys(locationsCount);
    const clicks = countries.map((country) => locationsCount[country] || 0);

    function getRandomColor(opacity = 1) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    const backgroundColors = countries.map(() => getRandomColor(0.8));
    const borderColors = countries.map(() => getRandomColor(1));

    return {
      labels: countries,
      datasets: [
        {
          label: "Clics",
          data: clicks,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };
  };

  if (loading) {
    return (
      <Loader
        type="loading"
        text="Cargando..."
        className="flex items-center justify-center h-[90%]"
      />
    );
  }

  if (!urlData) return <p>No se encontró la URL.</p>;
  return (
    <>
      <nav className="flex flex-row justify-between items-center md:gap-10 mb-2 ">
        <h1 className="flex title dashGrlHeadings text-2xl mb-0 w-full">
          Detalle de URLs
        </h1>
        <Button
          label="volver"
          variant="link"
          icon={IoReturnUpBack}
          onClick={() => navigate("/dashboard/urls")}
        />
      </nav>
      <hr className="mb-3" />
      <AnimatePresence>
        <motion.main
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-5"
        >
          <main className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_1fr] grid-rows-auto gap-3">
            {/* *********0*************************** */}
            <section className="col-span-1 md:col-span-5 h-fit">
              <UrlInfo
                urlsStats={[urlData]}
                selectedUrls={selectedUrls}
                setSelectedUrls={setSelectedUrls}
                expiresAt={urlData.expiresAt}
              />
            </section>

            {/* ***********1************************ */}
            <section className={`col-span-1 w-full h-full ${(plan?.startsWith("pro")) ? "md:col-span-5 lg:col-span-2" : "md:col-span-2 lg:col-span-1"}`}>
                <article className={`grlContainer h-full w-full`}>
                  <h2 className="flex text-lg grlTxt mb-2">
                    Clics por Dispositivo
                  </h2>
                  <aside className={`flex justify-center md:flex-col itmes-center gap-4 ${
                      plan?.startsWith("pro")
                        ? "md:scale-90 md:py-6 lg:py-0 lg:px-10"
                        : ""
                    }`}
                  >
                    <UrlDetailCard
                      title="Móviles"
                      clicks={urlData.mobileClicks}
                      icon={<FaMobileAlt />}
                      className="bg-gradient-to-r from-green-400/30 via-teal-500/30 to-blue-600/30"
                    />
                    <UrlDetailCard
                      title="Ordenador"
                      clicks={urlData.desktopClicks}
                      icon={<GiLaptop />}
                      className="bg-gradient-to-r from-blue-600/30 via-purple-500/30 to-pink-500/30"
                    />
                  </aside>
                </article>
            </section>
            {/* *************2********************************************** */}
            <section className={`col-span-1 max-h-[23rem] ${(plan?.startsWith("pro")) ? "md:col-span-5 lg:col-span-3" : "md:col-span-3 lg:col-span-2"}`}>
                {(plan?.startsWith("pro") || plan?.startsWith("premium")) &&
                  urlData.locationsCount && (
                    <section className={"flex flex-col grlContainer h-full"}>
                      <h3 className="text-lg grlTxt w-full">Clics por país:</h3>
                      <article className="flex justify-center items-center flex-col w-full h-full md:h-[95%] px-0">
                        <DoughnutChart
                          key="doughnut-chart"
                          data={getProChartData(urlData.locationsCount)}
                        />
                      </article>
                    </section>
                  )}
            </section>
            {/* *************3********************** */}
            <section className={`col-span-1 md:col-span-5 lg:col-span-2`}>
              {plan?.startsWith("premium") && urlData.locationsWithDevices && (
                <section className="grlContainer w-full h-full justify-center items-center">
                  <h3 className="text-lg grlTxt">
                    Clics detallados por país y dispositivo:
                  </h3>
                  <article className="flex justify-center items-center flex-col w-full md:h-[94%]">
                    <BarChart
                      key="bar-chart"
                      data={getDeviceChartData(urlData.locationsWithDevices)}
                      isMobile={isMobile}
                      isDarkMode={isDarkMode}
                    />
                  </article>
                </section>
              )}
              </section>
            {/* **************4********************* */}
            <section className="col-span-1 md:col-span-5 w-full flex justify-end">
              <Button
                label="Eliminar URL"
                variant="danger"
                onClick={handleSelectForDeletion}
              />
            </section>
          </main>
        </motion.main>
      </AnimatePresence>
      <ConfirmModal
        open={confirmModal.isOpen}
        onClose={handleCloseConfirmModal}
        title="Confirmar eliminación"
        content="¿Estás seguro de que deseas eliminar esta URL? Esta acción no se puede deshacer."
        onConfirm={handleDeleteAndRedirect}
        loading={loadingAction}
      />
    </>
  );
};

export default UrlDetails;