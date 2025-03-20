/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "@molecules/NavBar";
import Footer from "@molecules/Footer";
import bgDark from "@assets/bgDark.png";
import bgLight from "@assets/bgLight.png";

const MainLayout = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(null);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const background = {
    backgroundImage: `url(${isDarkMode ? bgDark : bgLight})`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(5px)",
    transform: "scale(1.1)",
    opacity: 0.9,
  };

  if (isDarkMode === null) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={`fixed top-0 left-0 w-full justify-center transition-all duration-300 ${
          hasScrolled
            ? "shadow-md bg-light-bg dark:bg-dark-bg backdrop-blur-sm bg-opacity-90"
            : ""
        }`}
        style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 5 }}
      >
        <NavBar hasScrolled={hasScrolled} />
      </header>
      <main className="relative flex-grow flex justify-center items-center pt-5 shadow-xl">
        {/* main backgorund */}
        <div
          key={isDarkMode ? "dark" : "light"}
          className="fixed inset-0 h-screen w-screen z-0"
          style={background}
        />

        <div className="relative flex justify-center w-[95%] md:w-[90%] lg:w-[80%] z-[1]">
          <Outlet />
        </div>
      </main>

      <footer className="z-[10] bg-light-bg dark:bg-dark-bg opacity-100">
        <Footer />
      </footer>

      <style>
        {`
          html {
            overflow-y: scroll;
          }
          body {
            overflow-x: hidden;
            height: 100%;
            margin: 0;
          }
        `}
      </style>
    </div>
  );
};

export default MainLayout;
