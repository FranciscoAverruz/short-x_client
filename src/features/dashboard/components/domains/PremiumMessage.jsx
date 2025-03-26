/* eslint-disable no-unused-vars */
import React from "react";
import Medal from "@dashCommon/Medal.jsx"
import Brand from "@common/Brand.jsx";
import Button from "@atoms/Button.jsx";
import { motion } from "framer-motion";
import { GrUpgrade } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const PremiumMessage = () => {
    const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center w-full h-[70%] p-5"
    >
      <Brand
        classIcon="w-20 md:w-16"
        classTxt="flex-col items-center md:items-auto"
        classGrl="flex-col md:flex-row gap-5 mb-5 md:mb-10"
        classP=""
      />
      <h2 className="title text-2xl md:text-4xl font-bold text-center mb-4">
        ¡Acceso exclusivo para usuarios Premium!
      </h2>
      <Medal 
        plan="premium"
        classNameIcon="text-6xl my-8"
      />
      <p className="text-center grlTxt mb-6">
        Para utilizar la funcionalidad de dominios personalizados, necesitas ser
        un usuario premium.
      </p>
      <Button
        label="Actualiza tu plan aquí"
        icon={GrUpgrade}
        onClick={() => navigate('/dashboard/subscription?plan=premium')}
        className="text-2xl"
        ClassBtnIco="text-2xl"
      />
    </motion.div>
  );
};

export default PremiumMessage;
