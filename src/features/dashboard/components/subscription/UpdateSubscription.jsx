/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Input from "@molecules/Input.jsx";
import Button from "@atoms/Button.jsx";
import PlanLabel from "@dashCommon/PlanLabel.jsx";
import FormatDate from "@dashCommon/FormatDate";
import ConfirmModal from "@dashCommon/ConfirmModal.jsx";
import PricingModal from "@common/PricingModal";
import SubmitButton from "@molecules/SubmitButton.jsx";
import useAuthAxios from "@hooks/useAuthAxios";
import { toast } from "sonner";
import { Loader } from "@common/Loader.jsx";
import { API_URL } from "@src/Env.jsx";
import { logError } from "@utils/logger";
import { AuthContext } from "@context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const UpdateSubscription = ({ currentPlan = "free_monthly" }) => {
  const [newPlan, setNewPlan] = useState(currentPlan);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [upcomingPayment, setUpcomingPayment] = useState(null);
  const { userId, dispatch, subscription, plan } = useContext(AuthContext);
  const authAxios = useAuthAxios();

  const handlePlanSelect = (planType, billingCycle) => {
    const fullPlan = `${planType}_${
      billingCycle === "monthly" ? "monthly" : "annual"
    }`;
    setNewPlan(fullPlan);
    setModalOpen(false);
  };

  const fetchUpcomingPayment = async () => {
    if (newPlan === "free_monthly" || newPlan === "free_annual") {
      setConfirmOpen(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await authAxios.get(
        `${API_URL}/subscription/upcomingpay/${userId}/${newPlan}`
      );
      setUpcomingPayment({
        totalAmountDue: response.data.totalAmountDue,
        currency: response.data.currency,
        lineItems: response.data.lineItems,
        date: response.data.date,
      });
      setConfirmOpen(true);
    } catch (err) {
      const errorMessage = "Error al obtener la próxima factura.";
      setError(errorMessage);
      logError(errorMessage, err);
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  const handleUpdateSubscription = async () => {
    setLoading(true);
    try {
      await authAxios.put(`${API_URL}/subscription/${userId}/update`, {
        newPlan,
      });

      const response = await authAxios.get(
        `${API_URL}/subscription/${userId}/info`
      );
      const updatedSubscription = response.data.subscription;

      dispatch({
        type: "SET_SUBSCRIPTION",
        payload: updatedSubscription,
      });

      toast.success("Suscripción actualizada correctamente.");
      setConfirmOpen(false);
    } catch (err) {
      const errorMessage = "Error al actualizar la suscripción.";
      setError(errorMessage);
      logError(errorMessage, err);
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.main
        key="updateSubscription"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grlContainer flex flex-col md:flex-row gap-5 lg:gap-10 p-6 w-full items-center"
      >
        <aside className="flex flex-col justify-between h-full w-full md:w-full">
          <h2 className="text-xl subTitle1">Cambiar Plan</h2>
          <article className="flex flex-col md:flex-row lg:flex-col md:gap-5 lg:gap-0 md:w-full md:justify-center">
            <span className="flex flex-row lg:flex-row items-end p-0 w-full">
              <Input
                label={"Nuevo Plan"}
                type="text"
                id="newPlan"
                value={newPlan}
                className="rounded-r-none w-full"
                readOnly
              />
              <Button
                label="Cambiar"
                onClick={() => setModalOpen(true)}
                className="h-[2.6rem] m-0 px-4 md:px-2 text-xs rounded-none rounded-r-lg inputStyle top-0 hover:brightness-125"
                variant="secondary"
              />
            </span>
            <SubmitButton
              label="Actualizar"
              variant={
                subscription?.status === "pending" ? "secondary" : "primary"
              }
              onClick={fetchUpcomingPayment}
              disabled={loading}
              className="w-full mt-3 md:h-11 md:self-end lg:h-auto lg:self-auto"
            />
          </article>
        </aside>
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <PricingModal
          isOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
          handlePlanSelect={handlePlanSelect}
        />

        {loading ? (
          <Loader
            type="spinner"
            className="fixed inset-0 w-full h-full bg-black bg-opacity-60"
          />
        ) : (
          <ConfirmModal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            title="Confirmar actualización de suscripción"
            content={
              newPlan === "free_monthly" || newPlan === "free_annual" ? (
                <aside className="flex flex-col justify-center items-center grlTxt">
                  <p>
                    El cambio de tu plan
                    <strong className="smart text-xl mx-2">
                      <PlanLabel plan={subscription.plan} />
                    </strong>
                    a plan <strong className="smart text-xl mx-2">Free</strong>,
                    se completará el dia:
                  </p>

                  <strong className="smart text-xl mb-5">
                    {FormatDate(subscription.renewalDate)}
                  </strong>

                  <p>podrás continuar usando tu plan actual hasta esa fecha</p>
                </aside>
              ) : upcomingPayment ? (
                <aside className="grlTxt">
                  <span className="flex flex-col md:flex-row items-center md:items-baseline md:gap-2 w-full mb-8 md:mb-0">
                    <p className="subTitle2 text-base">Próximo pago:</p>
                    <p className="text-2xl">
                      {upcomingPayment.totalAmountDue}{" "}
                      {upcomingPayment.currency}
                    </p>
                  </span>
                  <span className="flex flex-row items-baseline gap-2 w-full mb-3">
                    <p className="subTitle2 text-base">Fecha:</p>
                    {FormatDate(upcomingPayment.date)}
                  </span>
                  <hr className="divider" />
                  <ul className="px-0 md:px-3">
                    {upcomingPayment.lineItems.map((item, index) => (
                      <li
                        key={index}
                        className={`flex flex-col md:flex-row md:justify-between w-full px-2 ${
                          index % 2 === 0
                            ? "bg-light-inputText/20 dark:bg-dark-inputText/10"
                            : "bg"
                        }`}
                      >
                        <span className="smart text-base font-medium md:mr-10">
                          {item.description}:
                        </span>
                        <span className="flex justify-end">
                          {item.amount} {upcomingPayment.currency}
                        </span>
                      </li>
                    ))}
                  </ul>
                </aside>
              ) : (
                <Loader type="spinner" className="w-full h-full" />
              )
            }
            onConfirm={handleUpdateSubscription}
            loading={loading}
          />
        )}
      </motion.main>
    </AnimatePresence>
  );
};

export default UpdateSubscription;
