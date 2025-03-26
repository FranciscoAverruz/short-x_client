/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import Button from "@atoms/Button";
import UrlInfo from "@dashCommon/UrlInfo.jsx";
import UrlForm from "@urlShortener/UrlForm.jsx";
import useAuthAxios from "@hooks/useAuthAxios";
import ConfirmModal from "@dashCommon/ConfirmModal.jsx";
import DashSearchBar from "@dashCommon/DashSearchBar.jsx";
import useUrlActions from "@hooks/useUrlActions";
import PaginationURL from "@dashCommon/PaginationURL";
import { Loader } from "@common/Loader.jsx";
import { API_URL } from "@src/Env.jsx";
import { logError } from "@utils/logger";
import { AuthContext } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MyUrls = () => {
  const [loading, setLoading] = useState(true);
  const [urlsStats, setUrlsStats] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUrls, setSelectedUrls] = useState([]);
  const { userId } = useContext(AuthContext);
  const authAxios = useAuthAxios();
  const navigate = useNavigate();

  const isMounted = useRef(true);

  const fetchUrlsStats = useCallback(async () => {
    if (!userId || !authAxios) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const urlsRes = await authAxios.get(`${API_URL}/user/${userId}/stats`, {
        signal,
        params: { page: currentPage },
      });

      if (isMounted.current) {
        setUrlsStats(urlsRes.data.stats || []);
        setTotalPages(urlsRes.data.pagination.totalPages);
      }
    } catch (error) {
      if (isMounted.current) {
        if (error.name !== "AbortError") {
          logError("Error fetching URLs stats:", error);
        }
      }
      setUrlsStats([]);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }

    return () => controller.abort();
  }, [userId, currentPage, authAxios]);

  const {
    loadingAction,
    confirmModal,
    closeConfirmModal,
    openConfirmModal,
    handleDeleteMultiple,
  } = useUrlActions(
    setUrlsStats,
    setSelectedUrls,
    selectedUrls,
    fetchUrlsStats
  );

  useEffect(() => {
    isMounted.current = true;

    if (userId) {
      fetchUrlsStats();
    }

    return () => {
      isMounted.current = false;
    };
  }, [userId, currentPage, fetchUrlsStats]);

  if (loading) {
    return (
      <Loader
        type="loading"
        text="Cargando..."
        className="flex items-center justify-center h-[90%]"
      />
    );
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h1 className="title dashGrlHeadings text-2xl">Mis URLs</h1>
      <hr className="divider mb-8" />
      <AnimatePresence>
        <main className="px-5">
          <aside className="flex flex-col lg:flex-row max-w-7xl mx-auto lg:gap-10">
            <motion.section
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-10 lg:mb-0 w-full lg:w-1/3 "
            >
              <UrlForm
                updateUrlsList={fetchUrlsStats}
                classUrlForm="grlContainer md:p-8"
              />
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col w-full lg:w-2/3"
            >
              <aside className="flex flex-row justify-between items-center mb-3 gap-3">
                <DashSearchBar placeholder="Buscar URL" />
                {selectedUrls.length > 0 && (
                  <Button
                    onClick={openConfirmModal}
                    variant="danger"
                    className="w-2/3 md:w-fit px-0 md:px-3 py-[0.4rem]"
                    disabled={loading}
                    label={
                      loading ? (
                        <Loader type="loading" text="Eliminando..." />
                      ) : (
                        "Eliminar seleccion"
                      )
                    }
                  />
                )}
              </aside>
              <aside className="flex w-full flex-col h-[70vh] lg:h-[60vh] overflow-y-scroll lg:pr-3">
                {urlsStats.length > 0 ? (
                  <UrlInfo
                    urlsStats={urlsStats}
                    selectedUrls={selectedUrls}
                    setSelectedUrls={setSelectedUrls}
                    setUrlsStats={setUrlsStats}
                    fetchUrlsStats={fetchUrlsStats}
                    openConfirmModal={openConfirmModal}
                  />
                ) : (
                  <p className="grlTxt">No hay estadisticas disponibles</p>
                )}
              </aside>
              <PaginationURL
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                totalPages={totalPages}
                currentPage={currentPage}
                goToPage={goToPage}
                className="lg:mr-8"
              />
            </motion.section>

            <section className="md:hidden mt-4">
              <Button
                onClick={() => navigate("/dashboard/myaccount")}
                variant="navbar"
                label="Regresar a Mi Cuenta"
              />
            </section>
          </aside>
        </main>
      </AnimatePresence>

      {confirmModal.isOpen && (
        <ConfirmModal
          open={confirmModal.isOpen}
          onClose={closeConfirmModal}
          title="Confirmar Eliminación"
          content={
            <div>
              <p>¿Estás seguro de que deseas eliminar las siguientes URLs?</p>
              <ol>
                {selectedUrls.map((url, index) => (
                  <li key={index}>{url}</li>
                ))}
              </ol>
            </div>
          }
          onConfirm={handleDeleteMultiple}
          loading={loadingAction}
        />
      )}
    </>
  );
};

export default MyUrls;
