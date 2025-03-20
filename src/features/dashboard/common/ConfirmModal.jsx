/* eslint-disable react/prop-types */
import React from "react";
import Dialog from "@common/Dialog.jsx";
import Button from "@atoms/Button.jsx";
import { TbCancel } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const ConfirmModal = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
  secondaryAction,
  loading,
  secondaryLabel = "Cancelar",
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <aside className="p-4">
        <h2 className="flex title text-2xl font-medium w-full justify-center text-center my-8 subTitle2">
          {title}
        </h2>
        <hr className="divider mb-5" />
        <section className="flex justify-center">
          {React.isValidElement(content) ? content : <span>{content}</span>}
        </section>
        <section className="flex justify-end mt-8">
          <Button
            label="Cancelar"
            icon={TbCancel}
            variant="secondary"
            className="mr-3"
            onClick={onClose}
          />
          {secondaryAction && (
            <Button
              label={secondaryLabel}
              icon={TbCancel}
              variant="secondary"
              className="mr-3"
              onClick={secondaryAction}
              disabled={loading}
            />
          )}
          <Button
            label={loading ? "Procesando..." : "Confirmar"}
            icon={IoMdCheckmarkCircleOutline}
            onClick={onConfirm}
            disabled={loading}
          />
        </section>
      </aside>
    </Dialog>
  );
};

export default ConfirmModal;
