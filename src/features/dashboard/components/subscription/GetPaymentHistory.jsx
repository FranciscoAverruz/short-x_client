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
        console.log("response en PAYMENT ISTORY >> ", response);

        setPaymentHistory(response.data.payments || []);

        dispatch({
          type: "SET_PAYMENT_HISTORY",
          payload: response.data.payments || [],
        });
      } catch (err) {
        logError("Error al obtener historial de pagos:", err);
        setError("Hubo un problema al obtener los pagos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [userId, authAxios, dispatch]);

  if (loading) {
    return <Loader type="spinner" className="w-full h-full" />;
  }
  if (error) return <div className="text-red-500">{error}</div>;
  if (!paymentHistory || paymentHistory.length === 0)
    return <div>No hay pagos registrados.</div>;

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
        className="p-4 md:p-0 lg:p-5  w-full h-full"
      >
        <h2 className="text-xl subTitle1">Historial de Pagos</h2>
        <ul className="mt-0 items-center">
          {paymentHistory.map((payment, index) => {
            const isDetailsVisible = detailsVisibility[payment._id];
            return (
              <li key={payment._id || payment.transactionId}>
                <article className="flex flex-row justify-between items-center paragraphText text-sm">
                  <span className="flex flex-row md:gap-8">
                    <p>
                      <strong className="subTitle2 text-base mr-2">
                        Fecha:
                      </strong>{" "}
                      {new Date(payment.timestamp).toLocaleDateString()}
                    </p>
                    <p className=" hidden lg:block">
                      <strong className="subTitle2 text-base mr-2">
                        Factura:{" "}
                      </strong>
                      {payment.invoiceNumber}
                    </p>
                    <p>
                      <strong className="subTitle2 text-base mr-2">
                        Monto:
                      </strong>{" "}
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
                  <>
                    <article className="flex flex-col lg:flex-row items-start justify-start lg:items-center lg:justify-between lg:gap-5 mt-2 pl-3 bg rounded-lg paragraphText text-sm dark:opacity-80">
                      <aside className="flex flex-col md:flex-row md:gap-5">
                        <p className="block lg:hidden">
                          <strong className="subTitle1 text-sm font-normal mr-2">
                            Factura:
                          </strong>
                          {payment.invoiceNumber}
                        </p>
                        <p>
                          <strong className="subTitle1 text-sm font-normal mr-2">
                            Método de pago:
                          </strong>
                          {payment.paymentMethod}
                        </p>
                        <p className="flex flex-row gap-2">
                          <strong className="subTitle1 text-sm font-normal mr-2">
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
                        <p>
                          <strong className="subTitle1 text-sm font-normal mr-2">
                            Transacción:
                          </strong>{" "}
                          {payment.transactionId}
                        </p>
                      </aside>
                      {payment.invoiceUrl && (
                        <Button
                          label={"Factura"}
                          icon={TbInvoice}
                          variant="secondary"
                          onClick={() => viewInvoice(payment.invoiceUrl)}
                          className="w-full md:w-auto"
                        />
                      )}
                    </article>
                  </>
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
