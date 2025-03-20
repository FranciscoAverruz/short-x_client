/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Avatar = ({ src, alt, size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden bg-light-sectionBg dark:bg-dark-sectionBg`}
    >
      {src ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-light-Title dark:text-dark-Title">
          {alt ? alt.charAt(0).toUpperCase() : "U"}
        </div>
      )}
    </div>
  );
};

export default Avatar;
