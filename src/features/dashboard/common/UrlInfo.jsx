/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Input from "@molecules/Input.jsx";
import Button from "@atoms/Button.jsx";
import Tooltip from "@molecules/Tooltip.jsx";
import FormatDate from "@dashCommon/FormatDate";
import { toast } from "sonner";
import { TbListDetails } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5";
import { FaLink, FaRegCopy } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const UrlInfo = ({
  urlsStats,
  selectedUrls,
  setSelectedUrls,
  openConfirmModal,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSelection = (shortId) => {
    setSelectedUrls((prevSelected) =>
      prevSelected.includes(shortId)
        ? prevSelected.filter((id) => id !== shortId)
        : [...prevSelected, shortId]
    );
  };

  const confirmDelete = (shortId) => {
    setSelectedUrls([shortId]);
    openConfirmModal();
  };

  const tooltipPosition = {
    top: "-30px",
    left: "30%",
    transform: "translateX(-50%)",
  };
  const formatDate = FormatDate;

  const isDetailPage = location.pathname.includes("/dashboard/urls/");

  return (
    <AnimatePresence>
      <ul className="flex flex-col gap-2 w-full h-fit">
        {urlsStats.map((url, index) => {
          const formattedExpiration = formatDate(url.expiresAt);
          // const urlToRedirect = `${FRONTEND_URL}/${url.shortLink}`;
          const shortenedUrl = `${url.customDomain}/${url.shortLink}`;
          const domain = new URL(url.originalUrl).hostname;
          let faviconUrl = `${url.originalUrl}/favicon.ico`;

          const handleError = (e) => {
            e.target.src = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
          };

          const copyToClipboard = () => {
            navigator.clipboard.writeText(shortenedUrl);
            toast.success("¡URL copiada al portapapeles!");
          };

          const isSelected =
            selectedUrls && selectedUrls.includes(url.shortLink);

          return (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.9,
                rotate: 15,
                filter: "brightness(1.5)",
                transition: { duration: 0.5 },
                backgroundColor: "rgba(255, 0, 0, 0.3)",
              }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col grlContainer grlTxt max-w-7xl border-2 transition-colors duration-300 ease-in-out ${
                isSelected ? "border-red-300 bg-red-50" : "border-transparent"
              }`}
            >
              <section className="flex flex-col md:flex-row w-full items-start">
                <article className="flex flex-row mr-5 items-start">
                  {!isDetailPage && (
                    <Input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelection(url.shortLink)}
                      className="mr-2"
                    />
                  )}
                  <div className="max-w-8 max-h-8 aspect-square">
                    {faviconUrl ? (
                      <img
                        src={faviconUrl}
                        alt="Favicon"
                        className="rounded-md col-span-1 w-8 h-8 aspect-square"
                        onError={handleError}
                      />
                    ) : (
                      <FaLink className="w-8 h-8" />
                    )}
                  </div>
                </article>
                <div className="w-full">
                  <aside className="flex flex-col-reverse md:flex-row md:justify-between">
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
                  </aside>
                  <p className="break-all overflow-hidden line-clamp-1 w-full opacity-50">
                    {url.originalUrl}
                  </p>
                </div>
              </section>
              <hr className="divider" />
              <article className="flex flex-row justify-end gap-2">
                <aside className="flex items-center text-sm h-full grlTxt w-ful">
                  {formattedExpiration ? (
                    <p>Expira: {formattedExpiration}</p>
                  ) : (
                    <p>¡Esta URL no expira!</p>
                  )}
                </aside>
                <Tooltip tooltipText="Copiar" tooltipStyles={tooltipPosition}>
                  <Button
                    onClick={copyToClipboard}
                    variant="toggle"
                    icon={FaRegCopy}
                    ClassBtnIco="w-4 h-4"
                    className="actionBtn opacity-70"
                    // title="Copiar"
                  />
                </Tooltip>
                <Tooltip tooltipText="Editar" tooltipStyles={tooltipPosition}>
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/urls/${url.shortLink}/edit`, {
                        state: { urlData: url },
                      })
                    }
                    variant="toggle"
                    icon={MdOutlineModeEdit}
                    ClassBtnIco="w-4 h-4"
                    className="actionBtn opacity-70"
                    // title="Editar"
                  />
                </Tooltip>

                {!isDetailPage && (
                  <>
                    <Button
                      onClick={() => confirmDelete(url.shortLink)}
                      variant="toggle"
                      icon={IoTrashOutline}
                      ClassBtnIco="w-4 h-4"
                      className="actionBtn opacity-70"
                      title="Eliminar"
                    />
                    <Button
                      onClick={() =>
                        navigate(`/dashboard/urls/${url.shortLink}`)
                      }
                      variant="toggle"
                      icon={TbListDetails}
                      ClassBtnIco="w-4 h-4"
                      className="actionBtn opacity-70"
                      title="Detalles"
                    />
                  </>
                )}
              </article>
            </motion.li>
          );
        })}
      </ul>
    </AnimatePresence>
  );
};

export default UrlInfo;
