/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useCallback } from "react";
import { API_URL } from "@src/Env.jsx";
import { AuthContext } from "@context/AuthContext";
import useAuthAxios from "@hooks/useAuthAxios";
import { useNavigate } from "react-router-dom";
import { Loader } from "@common/Loader.jsx";
import UrlForm from "@urlShortener/UrlForm.jsx";
import Button from "@atoms/Button";
import PaginationURL from "@dashCommon/PaginationURL";
import UrlInfo from "@dashCommon/UrlInfo.jsx";
import DashSearchBar from "@dashCommon/DashSearchBar.jsx";
import useUrlActions from "@hooks/useUrlActions";
import ConfirmModal from "@dashCommon/ConfirmModal.jsx";
import { motion, AnimatePresence } from "framer-motion";

const MyUrls = () => {
  const [urlsStats, setUrlsStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUrls, setSelectedUrls] = useState([]);
  
   const { userId } = useContext(AuthContext);
  const authAxios = useAuthAxios();
  const navigate = useNavigate();
  

  const fetchUrlsStats = useCallback(async () => {
    if (!userId) return;
    try {
      const urlsRes = await authAxios.get(`${API_URL}/user/${userId}/stats`, {
        params: {
          page: currentPage,
        },
      });
      setUrlsStats(urlsRes.data.stats || []);
      setTotalPages(urlsRes.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching URLs stats:", error);
      alert(error);
      setUrlsStats([]);
    } finally {
      setLoading(false);
    }
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
    if (!userId) return;
    fetchUrlsStats();
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

  console.log("🔍 openConfirmModal en MyUrls:", openConfirmModal);

  return (
    <>
    <AnimatePresence>
      <main className="px-5">
        <nav className="flex flex-col md:flex-row justify-center md:justify-between items-center md:gap-10 mb-2">
          <h1 className="title dashGrlHeadings text-2xl mb-0 w-full">
            Mis URL
          </h1>
        </nav>
        <hr className="mb-3" />
        <aside className="flex flex-col lg:flex-row max-w-7xl mx-auto lg:gap-10">
          <motion.section
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-10 lg:mb-0 grlContainer w-full lg:w-1/3 "
          >
            <UrlForm updateUrlsList={fetchUrlsStats} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col w-full lg:w-2/3"
          >
            <aside className="flex flex-row justify-between items-center mb-3 ">
              <DashSearchBar placeholder="Buscar URL" />
              {selectedUrls.length > 0 && (
                <Button
                  onClick={openConfirmModal}
                  variant="danger"
                  className=""
                  disabled={loading}
                  label={
                    loading ? (
                      <Loader type="loading" text="Eliminando..." />
                    ) : (
                      "Eliminar seleccionadas"
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
                <p>No stats available for your URLs.</p>
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