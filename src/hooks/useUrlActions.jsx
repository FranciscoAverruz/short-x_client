import { toast } from "sonner";
import { API_URL } from "@src/Env.jsx";
import { logError } from "@utils/logger";
import { AuthContext } from "@context/AuthContext";
import { useContext, useState } from "react";
import useAuthAxios from "@hooks/useAuthAxios";

const useUrlActions = (
  setUrlsStats,
  setSelectedUrls,
  selectedUrls,
  fetchUrlsStats,
  shortenedUrl
) => {
  const [loadingAction, setLoadingAction] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false });
  const [errorMessage, setErrorMessage] = useState(null);
  const { userId } = useContext(AuthContext);
  const authAxios = useAuthAxios();

  const openConfirmModal = () => {
    setConfirmModal({ isOpen: true });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false });
    setErrorMessage(null);
  };

  const handleDeleteMultiple = async () => {
    if (!Array.isArray(selectedUrls) || selectedUrls.length === 0) {
      logError("selectedUrls no es un arreglo o está vacío");
      return;
    }

    const shortIds = selectedUrls;
    setLoadingAction(true);
    try {
      await authAxios.delete(`${API_URL}/user/${userId}/urls/delete`, {
        data: { shortIds },
      });

      setTimeout(() => {
        setUrlsStats((prev) =>
          prev.filter((url) => !selectedUrls.includes(url.shortLink))
        );
        setSelectedUrls([]);
      }, 400);

      toast.success("URLs eliminadas correctamente");

      if (!window.location.pathname.includes("/dashboard/urls/")) {
        setTimeout(() => {
          fetchUrlsStats();
        }, 600);
      }
    } catch (error) {
      logError(
        "Error al eliminar las URLs:",
        error.response ? error.response.data : error
      );
      toast.error("Error al eliminar las URLs:");
    } finally {
      setLoadingAction(false);
      closeConfirmModal();
    }
  };

  return {
    loadingAction,
    confirmModal,
    closeConfirmModal,
    handleDeleteMultiple,
    openConfirmModal,
    errorMessage,
    shortenedUrl,
  };
};

export default useUrlActions;
