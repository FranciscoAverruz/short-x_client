/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { GoKey } from "react-icons/go";
import { Loader } from "@common/Loader.jsx";
import { API_URL } from "@src/Env.jsx";
import { TbCancel } from "react-icons/tb";
import { logError } from "@utils/logger";
import { IoIosLink } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/AuthContext";
import { IoTrashOutline } from "react-icons/io5";
import { lazy, Suspense, useContext, useState } from "react";
import FormatDate from "@dashCommon/FormatDate.jsx";
import useAuthAxios from "@hooks/useAuthAxios";
import ConfirmModal from "@dashCommon/ConfirmModal";
const Button = lazy(() => import("@atoms/Button"));

const Actions = ({ user, totalUrls, handleRedirectToMyUrls }) => {
  const { userId, dispatch } = useContext(AuthContext);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [loadingSuspend, setLoadingSuspend] = useState(false);
  const authAxios = useAuthAxios();
  const cancelDate = FormatDate(user.scheduledForDeletion);
  const isCancellationPending = user.isCancellationPending;
  const navigate = useNavigate();

  const handleCancelAccount = async () => {
    setLoadingCancel(true);
    try {
      const response = await authAxios.post(
        `${API_URL}/user/${userId}/request-deletion`,
        {
          deletionTimeInHours: 24,
        }
      );

      toast.success(response.data.message);
      dispatch({
        type: "UPDATE_USER",
        payload: {
          isCancellationPending: true,
          scheduledForDeletion: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      setIsCancelModalOpen(false);
    } catch (error) {
      logError("Error canceling account:", error);
      toast.error("Error requesting account deletion.");
    } finally {
      setLoadingCancel(false);
    }
  };

  const handleSuspendCancellation = async () => {
    setLoadingSuspend(true);
    try {
      const response = await authAxios.post(
        `${API_URL}/user/${userId}/cancel-deletion`
      );

      toast.success(response.data.message);

      dispatch({
        type: "UPDATE_USER",
        payload: { isCancellationPending: false, scheduledForDeletion: null },
      });
      setIsSuspendModalOpen(false);
    } catch (error) {
      logError("Error suspendiendo cancelación:", error);
      toast.error("Error al suspender la cancelación.");
    } finally {
      setLoadingSuspend(false);
    }
  };

  const handleChangePassword = () => {
    navigate("/dashboard/password");
  };

  return (
    <main
      className={`flex gap-4 md:gap-6 w-full ${
        isCancellationPending ? "flex-col-reverse" : "flex-col"
      } `}
    >
      <section className="grlContainer row-span-1 col-span-1 flex items-center lg:flex-col h-fit justify-center md:p-8 gap-3">
        <article className="flex flex-row space-x-2 w-full h-full items-center">
          <h2 className="subTitle2 text-xl">URLs:</h2>
          <p className=" inputStyle w-full">{totalUrls}</p>
        </article>
        <article className="lg:mt-4 w-full">
          <Suspense fallback={<Loader type="spinner" />}>
            <Button
              label="Ver Mis URLs"
              variant="link"
              icon={IoIosLink}
              onClick={handleRedirectToMyUrls}
              className="px-4 py-2 w-full justify-center border border-light-btnSecBorder dark:border-dark-btnSecBorder shadow-md hover:bg-light-accent/20"
            />
          </Suspense>
        </article>
      </section>

      <section className="grlContainer md:p-8">
        <Suspense fallback={<Loader type="spinner" />}>
          <Button
            label="Change Password"
            variant="secondary"
            icon={GoKey}
            onClick={handleChangePassword}
            className="w-full px-4 py-2"
          />
        </Suspense>
      </section>

      <section className="flex flex-col w-full grlContainer md:p-8">
        {!isCancellationPending && (
          <Suspense fallback={<Loader type="spinner" />}>
            <Button
              label="Eliminar Cuenta"
              icon={IoTrashOutline}
              variant="danger"
              onClick={() => setIsCancelModalOpen(true)}
              className="w-full px-4 py-2 "
            />
            <ConfirmModal
              open={isCancelModalOpen}
              onClose={() => setIsCancelModalOpen(false)}
              title="¿Estás seguro?"
              content="Tu cuenta será eliminada en 24 horas. ¿Quieres continuar?"
              onConfirm={handleCancelAccount}
              loading={loadingCancel}
            />
          </Suspense>
        )}
        {isCancellationPending && (
          <article>
            <div className="text-center mb-2">
              <p className="subTitle1 text-base">Cancelación programada:</p>
              <span className="title text-base">{cancelDate}</span>
            </div>
            <Suspense fallback={<Loader type="spinner" />}>
              <Button
                label="Suspender Cancelacion"
                icon={TbCancel}
                variant="primary"
                onClick={() => setIsSuspendModalOpen(true)}
                className="w-full px-4 py-2"
              />
              <ConfirmModal
                open={isSuspendModalOpen}
                onClose={() => setIsSuspendModalOpen(false)}
                title="Suspender cancelación"
                content="vas suspender la cancelación, tu cuenta ya no será eliminada. ¿Quieres continuar?"
                onConfirm={handleSuspendCancellation}
                loading={loadingSuspend}
              />
            </Suspense>
          </article>
        )}
      </section>
    </main>
  );
};

export default Actions;
