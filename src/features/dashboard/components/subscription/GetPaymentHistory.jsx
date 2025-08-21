/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import Button from "@atoms/Button.jsx";
import useAuthAxios from "@hooks/useAuthAxios";
import { toast } from "sonner";
import { Loader } from "@common/Loader.jsx";
import { API_URL } from "@src/Env.jsx";
import { logError } from "@utils/logger";
import { TbInvoice } from "react-icons/tb";
import { AuthContext } from "@context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const GetPaymentHistory = () => {
  const [error, setError] = useState(null);
  const [detailsVisibility, setDetailsVisibility] = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState(null);
  const { userId, dispatch } = useContext(AuthContext);
  const authAxios = useAuthAxios();

  useEffect(() => {
    if (!userId) {
      setError("No se pudo obtener el ID de usuario.");
      return;
    }

    const fetchPaymentHistory = async () => {
      try {
        setLoading(true);

        const response = await authAxios.get(
          `${API_URL}/subscription/${userId}/payment-history`
        );

        setPaymentHistory(response.data.payments || []);

        dispatch({
          type: "SET_PAYMENT_HISTORY",
          payload: response.data.payments || [],
        });
      } catch (err) {
        logError("Error al obtener historial de pagos:", err);

        const isNotFound = err?.response?.status === 404;
        const message = isNotFound
          ? "Todavía no tienes historial de pagos."
          : "Ocurrió un error al cargar el historial de pagos.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [userId, authAxios, dispatch]);

  if (loading) {
    return <Loader type="spinner" className="w-full h-full" />;
  }

  if (error || !paymentHistory || paymentHistory.length === 0)
    return (
      <section>
        <h2 className="text-xl subTitle1 p-4 md:p-0 lg:py-2 px-1 w-full h-fit">
          Historial de Pagos
        </h2>
        <p className="paragraphText">{error}</p>
      </section>
    );

  const toggleDetailsVisibility = (paymentId) => {
    setDetailsVisibility((prevState) => ({
      ...prevState,
      [paymentId]: !prevState[paymentId],
    }));
  };

  const viewInvoice = (invoiceUrl) => {
    if (invoiceUrl) {
      window.open(invoiceUrl, "_blank");
    } else {
      toast.warning("Factura no disponible.");
    }
  };

  return (
    <AnimatePresence>
      <motion.aside
        key="myAccountMain"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-4 md:p-0 lg:py-5 px-1 w-full h-full"
      >
        <h2 className="text-xl subTitle1">Historial de Pagos</h2>
        <ul className="mt-0 items-center">
          {paymentHistory.map((payment, index) => {
            const isDetailsVisible = detailsVisibility[payment._id];
            return (
              <li key={payment._id || payment.transactionId}>
                <article className="flex flex-row justify-between items-center paragraphText text-sm">
                  <span className="flex flex-row gap-3 md:gap-8">
                    <p className="flex flex-wrap items-baseline">
                      <strong className="subTitle2 text-base mr-1">
                        Fecha:
                      </strong>
                      {new Date(payment.timestamp).toLocaleDateString()}
                    </p>
                    <p className="hidden lg:flex flex-wrap items-baseline">
                      <strong className="subTitle2 text-base mr-1">
                        Factura:
                      </strong>
                      {payment.invoiceNumber}
                    </p>
                    <p className="flex flex-wrap items-baseline">
                      <strong className="subTitle2 text-base mr-1">
                        Monto:
                      </strong>
                      {payment.amount} {payment.currency}
                    </p>
                  </span>
                  <Button
                    label={
                      isDetailsVisible ? "Ocultar detalles" : "Mostrar detalles"
                    }
                    variant="link"
                    onClick={() => toggleDetailsVisibility(payment._id)}
                  />
                </article>
                <hr className="divider -my-1" />
                {isDetailsVisible && (
                    <article className="flex flex-col md:flex-row items-start justify-start lg:items-center md:justify-between mt-2 pl-3 bg rounded-lg paragraphText text-sm dark:opacity-80 w-full">
                      <aside className="flex md:flex-row gap-x-5 w-full flex-wrap">
                        <p className="flex flex-col lg:hidden">
                          <strong className="subTitle1 text-sm font-normal mr-1">
                            Factura:
                          </strong>
                          {payment.invoiceNumber}
                        </p>
                        <p className="flex flex-col md:flex-row flex-wrap">
                          <strong className="subTitle1 text-sm font-normal mr-1">
                            Método de pago:
                          </strong>
                          {payment.paymentMethod}
                        </p>
                        <p className="flex flex-col lg:flex-row lg:gap-x-2 flex-wrap">
                          <strong className="subTitle1 text-sm font-normal mr-1">
                            Estado:
                          </strong>
                          <span
                            className={` ${
                              payment.status === "success"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </p>
                        <p className="flex flex-col lg:flex-row flex-wrap">
                          <strong className="subTitle1 text-sm font-normal mr-2">
                            Transacción:
                          </strong>
                          <span className="overflow-y-hidden">{payment.transactionId}</span>
                        </p>
                      </aside>
                      <aside className="flex self-end w-full md:w-fit">
                      {payment.invoiceUrl && (
                        <Button
                          label={"Factura"}
                          icon={TbInvoice}
                          variant="secondary"
                          onClick={() => viewInvoice(payment.invoiceUrl)}
                          className="w-full md:w-fit gap-1 text-xs p-1"
                          ClassBtnIco="text-sm"
                        />
                      )}
                      </aside>
                    </article>
                )}
              </li>
            );
          })}
        </ul>
      </motion.aside>
    </AnimatePresence>
  );
};

export default GetPaymentHistory;
