/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from "react";
import Input from "@molecules/Input";
import Button from "@atoms/Button";
import SubmitButton from "@molecules/SubmitButton.jsx";
import useShortenUrlInvited from "@hooks/useShortenUrlInvited";
import useShortenUrlForUser from "@hooks/useShortenUrlForUser";
import { toast } from "sonner";
import { FaRegCopy } from "react-icons/fa";
import { TbLinkPlus } from "react-icons/tb";
import { AuthContext } from "@context/AuthContext";
import { FRONTEND_URL } from "@src/Env.jsx";

const UrlForm = ({ updateUrlsList, classUrlForm }) => {
  const urlInvited = useShortenUrlInvited();
  const urlForUser = useShortenUrlForUser();
  const { userId } = useContext(AuthContext);
  const {
    link,
    setLink,
    shortenedUrl,
    error,
    loading,
    shortenUrl,
    setShortenedUrl,
    setCustomId,
    customId,
  } = userId ? urlForUser : urlInvited;

  useEffect(() => {
    if (userId && shortenedUrl) {
      updateUrlsList();
    }
  }, [userId, shortenedUrl, updateUrlsList]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    toast.success("¡URL copiada al portapapeles!");
  };

  const resetForm = () => {
    setLink("");
    setShortenedUrl("");
  };

  return (
    <main className={`w-full ${classUrlForm}`}>
      <form onSubmit={shortenUrl}>
        <Input
          type="url"
          label="URL Original"
          placeholder="Introduce tu enlace aquí"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="p-2 bg-opacity-100 mb-2"
          required
        />

        {userId && (
          <article className="flex flex-col md:flex-row md:gap-5 lg:flex-col mb-3">
            <span className="w-full">
              <Input
                value={FRONTEND_URL}
                label="Dominio"
                className="labelInput"
                disabled
              />
            </span>
            <span className="w-full">
              <Input
                type="text"
                placeholder="ID personalizado (opcional)"
                value={customId || ""}
                label="Ruta"
                onChange={(e) => setCustomId(e.target.value)}
                className="w-full"
              />
            </span>
          </article>
        )}
        <section className="grid grid-cols-1 md:grid-cols-5 grid-rows-1 items-baseline md:items-center w-full h-fit justify-center gap-3">
          <div
            className={`col-span-1 md:col-span-4 w-full h-fit innerlight rounded-lg bg-light-bg dark:bg-dark-bg ${
              shortenedUrl ? "" : "hidden md:block"
            }`}
          >
            {shortenedUrl && !userId && (
              <div className="relative w-full px-2 py-2 pt-[6px] text-lg flex flex-col md:flex-row items-center justify-between m-0">
                <article className="flex flex-col md:flex-row gap-2">
                  <p className="absolute md:relative top-0 md:right-auto subTitle1 text-lg">
                    URL Acortada:
                  </p>
                  <a
                    href={shortenedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btnLink title text-xl pt-8 md:pt-0"
                  >
                    {shortenedUrl}
                  </a>
                </article>
                <Button
                  onClick={copyToClipboard}
                  label="Copiar"
                  variant="link"
                  icon={FaRegCopy}
                  className="absolute md:relative right-5 top-0 md:right-auto p-1 -mr-1 text-sm gap-1 font-bold justify-center md:border-l-2 rounded-none border-light-subTitle/30 dark:border-dark-subTitle/30"
                />
              </div>
            )}
          </div>
          <div className="col-span-1 self-end w-full">
            {shortenedUrl && !userId ? (
              <Button
                type="button"
                onClick={resetForm}
                label="Nueva URL"
                variant="secondary"
                icon={TbLinkPlus}
                className="w-full mt-0 p-2 gap-3"
              />
            ) : (
              <SubmitButton
                label={loading ? "Acortando..." : "Acortar"}
                className="w-full lg:w-36 mt-2"
                disabled={loading}
              />
            )}
          </div>
        </section>
      </form>

      {error && <p className="text-red-500">{error}</p>}
    </main>
  );
};

export default UrlForm;
