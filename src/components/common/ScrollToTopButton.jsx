/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { LuArrowBigUpDash } from "react-icons/lu";
import Button from "@atoms/Button.jsx";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={handleClick}
      className={`fixed bottom-3 right-1 md:bottom-24 lg:bottom-14 md:right-3 rounded-full w-12 h-12 shadow-lg transition-opacity duration-300 z-50 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } justify-center items-center`}
      variant="secondary"
      icon={LuArrowBigUpDash}
      aria-hidden="true"
      aria-label="Scroll to top"
    />
  );
};

export default ScrollToTopButton;
