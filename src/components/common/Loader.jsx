/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

export const Loader = ({
  type = "",
  text = "",
  className = "",
  classSpinner = "w-12 h-12",
}) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      {type === "loading" ? (
        <motion.p
          className="text-xl font-semibold text-blue-600"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          {text}
        </motion.p>
      ) : (
        <motion.div
          className={` border-4 border-blue-500 border-t-transparent rounded-full ${classSpinner}`}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      )}
    </div>
  );
};
