/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// UrlInfo.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useUrlActions from "@hooks/useUrlActions";
import { Loader } from "@common/Loader";
import { FRONTEND_URL } from "@src/Env.jsx";
import { FaLink, FaRegCopy } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import Button from "@atoms/Button.jsx";
import { useNavigate } from "react-router-dom";
import Input from "@molecules/Input.jsx";
import ConfirmModal from "@dashCommon/ConfirmModal.jsx";
import useFormatDate from "@hooks/useFormatDate";

const UrlInfo = ({ urlsStats, selectedUrls, setSelectedUrls, setUrlsStats, fetchUrlsStats}) => {
  const {
    loadingAction,
    confirmModal,
    closeConfirmModal,
    openConfirmModal,
    handleDeleteMultiple,
    shortenedUrl
  } = useUrlActions(setUrlsStats, setSelectedUrls, selectedUrls, fetchUrlsStats);
    const navigate = useNavigate();

  const toggleSelection = (shortId) => {
    setSelectedUrls((prevSelected) =>
      prevSelected.includes(shortId)
        ? prevSelected.filter((id) => id !== shortId)
        : [...prevSelected, shortId]
    );
  };

  const handleDeleteSingle = (shortLink) => {
    setSelectedUrls([shortLink]);
    openConfirmModal();
  };

  const formatDate = useFormatDate; 

  return (
    <AnimatePresence>
      <ul className="flex flex-col gap-2 w-full h-fit">
        {urlsStats.map((url, index) => {
          const formattedExpiration = formatDate(url.expiresAt);
          const shortenedUrl = `${FRONTEND_URL}/${url.shortLink}`;
          const longUrl = new URL(url.originalUrl).hostname;
          let faviconUrl = `${url.originalUrl}/favicon.ico`;
          const handleError = (e) => {
            e.target.src = `https://www.google.com/s2/favicons?sz=64&domain=${longUrl}`;
          };
          const copyToClipboard = () => {
            navigator.clipboard.writeText(shortenedUrl);
            alert("¡URL copiada al portapapeles!");
          };
          const isSelected = selectedUrls.includes(url.shortLink);
          return (
            <motion.li 
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 15 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col grlContainer grlTxt max-w-7xl ${isSelected ? 'border border-red-500' : 'border border-transparent'}`}
            >
              <article className="flex flex-col md:flex-row w-full items-start">
                <aside className="flex flex-row items-start">
                  <Input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelection(url.shortLink)}
                    className="mr-2"
                  />
                  <span className="max-w-8 max-h-8 aspect-square mr-5">
                    {faviconUrl ? (
                      <img
                        src={faviconUrl}
                        alt="Favicon"
                        className="rounded-md col-span-1 w-8 h-8"
                        onError={handleError}
                      />
                    ) : (
                      <FaLink className="w-8 h-8" />
                    )}
                  </span>
                </aside>
                <aside className="w-full">
                  <span className="flex flex-col-reverse md:flex-row md:justify-between">
                    <a
                      href={shortenedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="subTitle2 truncate text-base md:text-lg"
                    >
                      {shortenedUrl}
                    </a>
                    <span className="flex flex-row justify-end">
                      <p className="labelInput mr-1">Clicks:</p>
                      <p>{url.totalClicks}</p>
                    </span>
                  </span>
                  <p className="break-all overflow-hidden line-clamp-1 w-full opacity-50">
                    {url.originalUrl}
                  </p>
                </aside>
              </article>
              <hr className="my-2 border-light-btnSecBorder dark:border-dark-btnSecBorder" />
              <article className="flex flex-col md:flex-row justify-end gap-2">
                <aside className="flex items-center text-sm h-full grlTxt w-ful">
                {formattedExpiration ? 
                  <p>Expira: {formattedExpiration}</p> : 
                  <p>¡Esta URL no expira!</p>
                }</aside>
                <span className="flex flex-row justify-end">
                <Button
                  onClick={copyToClipboard}
                  variant="toggle"
                  icon={FaRegCopy}
                  ClassBtnIco="w-4 h-4"
                  className="actionBtn opacity-70"
                  title="Copiar"
                />
                <Button
                  onClick={() => {  }}
                  variant="toggle"
                  icon={MdOutlineModeEdit}
                  ClassBtnIco="w-4 h-4"
                  className="actionBtn opacity-70"
                  title="Editar"
                />
                <Button
                  onClick={() => handleDeleteSingle(url.shortLink)} 
                  variant="toggle"
                  icon={IoTrashOutline}
                  ClassBtnIco="w-4 h-4"
                  className="actionBtn opacity-70"
                  title="Eliminar"
                />
                <Button
                  onClick={() => navigate(`/dashboard/urls/${url.shortLink}`)}
                  variant="toggle"
                  icon={TbListDetails}
                  ClassBtnIco="w-4 h-4"
                  className="actionBtn opacity-70"
                  title="Detalles"
                />
                </span>
              </article>
            </motion.li>
          );
        })}
      </ul>
        {confirmModal.isOpen && (
          <ConfirmModal
            open={confirmModal.isOpen}
            onClose={closeConfirmModal}
            title="Confirmar Eliminación"
              content={
              <div>
                <p>¿Estás seguro de que deseas eliminar las siguientes URLs?</p>
                <ol>
                  {selectedUrls.map((url, index) => (
                    <li key={index}>{url}</li> 
                  ))}
                </ol>
              </div>
            }
            onConfirm={handleDeleteMultiple} 
            loading={loadingAction}
          />
        )}
    </AnimatePresence>
  );
};

export default UrlInfo;