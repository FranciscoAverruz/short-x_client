import { useContext, useState } from "react";
import { API_URL } from "@src/Env.jsx";
import { AuthContext } from "@context/AuthContext";
import useAuthAxios from "@hooks/useAuthAxios";
import { toast } from "sonner";

const useUrlActions = (setUrlsStats, setSelectedUrls, selectedUrls, fetchUrlsStats, shortenedUrl) => {
    const { userId } = useContext(AuthContext);
    const authAxios = useAuthAxios();
    const [loadingAction, setLoadingAction] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false });
    const [errorMessage, setErrorMessage] = useState(null);

    const openConfirmModal = () => {
        console.log("Selected URLs:", selectedUrls);
        setConfirmModal({ isOpen: true });
    };

    const closeConfirmModal = () => {
      setConfirmModal({ isOpen: false });
      setErrorMessage(null);
    };

    const handleDeleteMultiple = async () => {
      if (!Array.isArray(selectedUrls) || selectedUrls.length === 0) {
        console.error("selectedUrls no es un arreglo o está vacío");
        return;
      }

      console.log("selectedUrls == ", selectedUrls);

      const shortIds = selectedUrls;
      setLoadingAction(true);
      try {
        await authAxios.delete(`${API_URL}/user/${userId}/urls/delete`, { data: { shortIds } });

        setTimeout(() => {
          setUrlsStats((prev) => prev.filter((url) => !selectedUrls.includes(url.shortLink)));
          setSelectedUrls([]);
        }, 400); 

        toast.success("URLs eliminadas correctamente");

        if (!window.location.pathname.includes('/dashboard/urls/')) {
          setTimeout(() => {
            fetchUrlsStats();
          }, 600);
        }

      } catch (error) {
        console.error("Error al eliminar las URLs:", error.response ? error.response.data : error);
        const errorMsg = error.response ? error.response.data.error : "Error desconocido al eliminar las URLs";
        toast.error(`${errorMsg}`);
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
      shortenedUrl
    };
};

export default useUrlActions;
