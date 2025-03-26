/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import plans from "@dashCommon/PlansData.jsx";
import Button from "@atoms/Button.jsx";
import bgPricing from "@assets/bgPricing.webp";
import ToggleBillingCycle from "@homeSections/ToggleBillingCycle";
import { FaMedal } from "react-icons/fa6";
import { TbCancel } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";

const PremiumModal = ({ isOpen, onClose, handlePlanSelect }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  if (!isOpen) return null;

  const premiumPlan = plans.find((plan) => plan.planType === "premium");


  return (
    <main className="fixed inset-0 bg-black bg-opacity-90 flex backdrop-blur-sm justify-center items-center z-50 w-full h-full">
      <AnimatePresence>
      <motion.aside
        key="premiumModal"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      className="grlContainer rounded-xl shadow-lg p-6 w-11/12 max-w-lg">
        <h2 className="title text-2xl font-bold text-center mb-4">
          {premiumPlan.name}
        </h2>
        <article className="flex w-full justify-center mb-5">
            <ToggleBillingCycle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
        </article>
        {/* Plan Details */}
        <article className="relative bg-light-secondaryFrom dark:bg-dark-ttBg p-4 rounded-lg">
          <span
            className="absolute inset-0 bg-cover opacity-20 rounded-lg"
            style={{ backgroundImage: `url(${bgPricing})` }}
          />
          <p className="title text-xl font-bold text-center">
            {isAnnual
              ? premiumPlan.pricing.annual
              : premiumPlan.pricing.monthly}
          </p>
          <ul className="list-disc pl-5 mt-2 paragraphText">
            {premiumPlan.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </article>

        <article className="flex justify-between mt-4 gap-5">
          <Button
            label="Cancelar"
            icon={TbCancel}
            variant="secondary"
            onClick={onClose}
            className="w-1/3"
          />
          <Button
            label="Elegir Plan"
            variant="primary"
            icon={FaMedal}
            onClick={() => {
              handlePlanSelect(
                premiumPlan.planType,
                isAnnual ? "annual" : "monthly"
              );
              onClose();
            }}
            className="w-2/3"
            ClassBtnIco="text-light-premium"
          />
        </article>
      </motion.aside>
      </AnimatePresence>
    </main>
  );
};

export default PremiumModal;
