/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useCallback } from "react";
import Input from "@molecules/Input.jsx";
import Button from "@atoms/Button.jsx";
import useAuthAxios from "@hooks/useAuthAxios";
import SubmitButton from "@molecules/SubmitButton.jsx";
import ConfirmModal from "@dashCommon/ConfirmModal.jsx";
import { toast } from "sonner";
import { API_URL } from "@src/Env.jsx";
import { AuthContext } from "@context/AuthContext";
import { IoTrashOutline } from "react-icons/io5";
import { TfiCheck } from "react-icons/tfi";
import { motion, AnimatePresence } from "framer-motion";
import {
  BiSolidMessageSquareCheck,
  BiSolidMessageSquareX,
} from "react-icons/bi";

const Domains = () => {
  const { userId } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [domain, setDomain] = useState("");
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [domainToDelete, setDomainToDelete] = useState(null);
  const authAxios = useAuthAxios();

  const fetchDomains = useCallback(async () => {
    try {
      const res = await authAxios.get(
        `${API_URL}/user/${userId}/custom-domains`
      );
      setDomains(res.data);
    } catch (err) {
      setError("Error fetching domains");
    }
  }, [authAxios, userId]);

  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  // **************************************************************
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  // **************************************************************
  const handleAddDomain = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authAxios.post(`${API_URL}/user/${userId}/custom-domains`, {
        domain,
      });
      setDomain("");
      fetchDomains();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding domain");
    }
    setLoading(false);
  };

  // **************************************************************
  const confirmDeleteDomain = (domain) => {
    setDomainToDelete(domain);
    setConfirmOpen(true);
  };

  // **************************************************************
  const handleDeleteDomain = async () => {
    if (!domainToDelete) return;
    try {
      await authAxios.delete(
        `${API_URL}/user/${userId}/custom-domains/${domainToDelete._id}`
      );
      fetchDomains();
      toast.success("Dominio eliminado correctamente");
    } catch (err) {
      toast.error("Error eliminando el dominio");
    }
    setConfirmOpen(false);
    setDomainToDelete(null);
  };

  // **************************************************************
  const handleVerifyDomain = async (customDomain) => {
    const token = prompt("Ingrese el token de verificación:");
    if (!token) return;

    try {
      const response = await authAxios.post(
        `${API_URL}/user/${userId}/custom-domains/verify`,
        { token, domain: customDomain.domain }
      );

      if (response.status === 200) {
        toast.success("Dominio verificado correctamente");
        fetchDomains();
      } else {
        toast.error(
          "La verificación falló. Revise el token y vuelva a intentarlo."
        );
      }
    } catch (err) {
      toast.error("Error al verificar el dominio.");
    }
  };

  return (
    <>
      <h1 className="title dashGrlHeadings text-2xl">
        Dominios Personalizados
      </h1>
      <hr className="divider mb-8" />
      <AnimatePresence>
        <motion.aside
          key="myAccountMain"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grlContainer max-w-5xl mx-auto p-4 md:p-6"
        >
          <form
            onSubmit={handleAddDomain}
            className="flex flex-col md:flex-row md:gap-5 w-full mb-5"
          >
            <span className="relative w-full">
              <span className="absolute right-0 -top-3 md:top-0 text-red-500">
                {error}
              </span>
              <Input
                id="domain"
                name="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Ingrese su dominio personalizado"
                label="Dominio Personalizado"
                required
                className="flex w-full"
              />
            </span>
            <span className="flex self-end w-full md:w-2/5 h-fit mt-3 md:mt-0">
              <SubmitButton
                label="Agregar Dominio"
                loading={loading}
                classNameButton="w-full h-11"
              />
            </span>
          </form>
          <hr className="divider mb-5" />
          <aside className="max-h-80 overflow-y-auto">
            {domains.length ? (
              <ul>
                {domains.map((d) => (
                  <li
                    key={d._id}
                    className="flex bg flex-col md:flex-row items-center justify-between px-3 py-2 rounded-lg shadow mb-2"
                  >
                    <article className="flex flex-col self-start justify-between">
                      <p className="subTitle1 text-base md:text-xl w-full">
                        {d.domain}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center">
                        {d.verified ? (
                          <>
                            {" "}
                            <BiSolidMessageSquareCheck className="text-green-500 mr-1" />{" "}
                            Verificado{" "}
                          </>
                        ) : (
                          <>
                            {" "}
                            <BiSolidMessageSquareX className="text-red-500 mr-1" />{" "}
                            No verificado{" "}
                          </>
                        )}
                      </p>
                    </article>
                    <article className="flex justify-end gap-3 slef-end w-full md:w-fit mt-3 md:mt-0">
                      {!d.verified && (
                        <Button
                          label="Verificar"
                          icon={TfiCheck}
                          variant="secondary"
                          onClick={() => handleVerifyDomain(d)}
                          className="px-3 py-1 text-sm md:text-base gap-2"
                        />
                      )}
                      <Button
                        label="Eliminar"
                        icon={IoTrashOutline}
                        variant="danger"
                        onClick={() => confirmDeleteDomain(d)}
                        className="px-3 py-1 bg-opacity-50 text-sm md:text-base gap-2"
                      />
                    </article>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay dominios registrados.</p>
            )}
          </aside>
        </motion.aside>
      </AnimatePresence>
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirmar Eliminación"
        content={
          <article className="flex flex-col items-center justify-center">
            ¿Está seguro de que desea eliminar el dominio
            <span className="my-5">
              <strong className="text-xl">{domainToDelete?.domain} </strong>?
            </span>
            Esta acción no se puede deshacer.
          </article>
        }
        onConfirm={handleDeleteDomain}
        loading={loading}
      />
    </>
  );
};

export default Domains;
