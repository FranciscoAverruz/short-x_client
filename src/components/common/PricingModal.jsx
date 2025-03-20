/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Button from "@atoms/Button.jsx";
import PricingSection from "@homeSections/PricingSection.jsx";
import { createPortal } from "react-dom";

const PrincingModal = ({ isOpen, closeModal, handlePlanSelect }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[60]">
      <div className="bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm h-full overflow-auto p-4 pb-10 rounded-lg shadow-lg relative w-full scale-90">
        <Button
          className="fixed top-1 right-3 text-3xl font-bold z-[70]"
          variant="navbar"
          onClick={closeModal}
          label="X"
        />
        <PricingSection
          handlePlanSelect={handlePlanSelect}
          closeModal={closeModal}
        />
      </div>
    </div>,
    document.body
  );
};

export default PrincingModal;
