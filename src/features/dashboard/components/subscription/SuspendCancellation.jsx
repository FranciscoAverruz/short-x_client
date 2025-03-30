/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Button from "@atoms/Button.jsx";
import useAuthAxios from "@hooks/useAuthAxios";
import ConfirmModal from "@dashCommon/ConfirmModal.jsx";
import { log } from "@utils/logger";
import { toast } from "sonner";
import { API_URL } from "@src/Env.jsx";
import { TbCancel } from "react-icons/tb";
import { AuthContext } from "@context/AuthContext";

const SuspendCancellation = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { userId, dispatch } = useContext(AuthContext);
  const authAxios = useAuthAxios();

  const handleSuspendCancellation = async () => {
    setLoading(true);
    try {
      const response = await authAxios.put(
        `${API_URL}/subscription/${userId}/suspend-cancellation`
      );
      toast.success("La cancelación ha sido suspendida.");

      dispatch({
        type: "SET_SUBSCRIPTION",
        payload: response.data.subscription,
      });
    } catch (err) {
      log("Error suspending cancellation: ", err);
      setError("Error al suspender la cancelación.");
      toast.error("Error al suspender la cancelación.");
    }
    setLoading(false);
    setOpenDialog(false);
  };

  const openConfirmationDialog = () => {
    setOpenDialog(true);
  };

  const closeConfirmationDialog = () => {
    setOpenDialog(false);
  };

  return (
    <article>
      <Button
        label={loading ? "Procesando..." : "Suspender cancelación"}
        icon={TbCancel}
        onClick={openConfirmationDialog}
        disabled={loading}
        className="w-full md:w-auto"
      />

      {error && toast.error(error)}

      <ConfirmModal
        open={openDialog}
        onClose={closeConfirmationDialog}
        title="¿Estás seguro?"
        content="Estás a punto de suspender la cancelación de tu suscripción. ¿Deseas continuar?"
        onConfirm={handleSuspendCancellation}
        loading={loading}
      />
    </article>
  );
};

export default SuspendCancellation;
