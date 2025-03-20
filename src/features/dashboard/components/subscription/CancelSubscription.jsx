/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Button from "@atoms/Button.jsx";
import useAuthAxios from "@hooks/useAuthAxios";
import ConfirmModal from "@dashCommon/ConfirmModal.jsx";
import { toast } from "sonner";
import { Loader } from "@common/Loader.jsx";
import { API_URL } from "@src/Env.jsx";
import { logError } from "@utils/logger";
import { AuthContext } from "@context/AuthContext";

const CancelSubscription = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { userId, dispatch } = useContext(AuthContext);
  const authAxios = useAuthAxios();

  const handleCancelSubscription = async () => {
    setLoading(true);
    try {
      const response = await authAxios.delete(
        `${API_URL}/subscription/${userId}/cancel`
      );

      toast.success("Suscripción cancelada exitosamente.");
      dispatch({ type: "SET_SUBSCRIPTION", payload: null });
    } catch (err) {
      logError("Error cancelando en CancelSubscription === ", err);
      setError("Error al cancelar la suscripción.");
      toast.error("Hubo un error al cancelar la suscripción.");
    }
    setLoading(false);
    setShowDialog(false);
  };

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  if (loading) {
    return (
      <span className="w-full">
        <Loader type="spinner" classSpinner="w-10 h-10" />
      </span>
    );
  }

  return (
    <>
      <Button
        label={loading ? "Cancelando..." : "Cancelar Suscripción"}
        variant="link"
        onClick={openDialog}
        className="px-4 py-2 w-full text-red-500 dark:text-dark-btnDangerBorder hover:text-red-800 dark:hover:text-red-400"
        disabled={loading}
      />

      {error && (
        <p className="absolute bottom-4 px-4 w-fit text-red-500 mt-2 h-15 text-center rounded-md border bg-red-50 dark:text-white dark:bg-dark-btnDangerBorder Border border-red-500">
          {error}
        </p>
      )}

      <ConfirmModal
        open={showDialog}
        onClose={closeDialog}
        title="¿Estás seguro de que deseas cancelar la suscripción?"
        content="Tu suscripción seguirá activa hasta la fecha de renovación."
        onConfirm={handleCancelSubscription}
        loading={loading}
      />
    </>
  );
};

export default CancelSubscription;
