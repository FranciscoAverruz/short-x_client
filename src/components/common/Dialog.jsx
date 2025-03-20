/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Button from "@atoms/Button.jsx";
import { IoCloseSharp } from "react-icons/io5";

const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 dark:bg-opacity-90">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-3xl bg rounded-lg shadow-lg p-5 max-h-[95vh] mt-16 overflow-y-auto grlTxt">
        <Button
          icon={IoCloseSharp}
          variant="danger"
          onClick={onClose}
          className="absolute top-2 right-2 text-4xl"
        />
        {children}
      </div>
    </div>
  );
};

export default Dialog;
