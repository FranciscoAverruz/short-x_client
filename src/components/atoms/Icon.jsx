/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Icon = ({ icon, className }) => (
  <div className={`absolute left-0 h-10 w-10 flex items-center justify-center rounded-l-md my-1 ${className="border-r-2 dark:border-r-dark-ttBg/50"}`}>
    <span className="text-light-Title/30 dark:text-dark-Title/30 focus:outline-none focus:ring-0">{icon}</span>
  </div>
);

export default Icon;
