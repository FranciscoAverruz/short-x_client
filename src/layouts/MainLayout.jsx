/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "@molecules/NavBar";
import Footer from "@molecules/Footer";
import ScrollToTopButton from "@common/ScrollToTopButton.jsx";

const MainLayout = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY * 0.2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
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
    backgroundImage: isDarkMode
      ? "linear-gradient(180deg, #0d0d0e 10%, #1C4BFF 100%, #5EA2FF 10%)"
      : "linear-gradient(180deg, #A5C8FF 10%, #f8fafc 100%, #3B6FFF 10%)",
    backgroundAttachment: "fixed",
    backgroundSize: "100% 200%",
    backgroundPosition: `center ${-scrollOffset}px`,
    transition: "background-position 0.1s ease-out",
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
      <main className="relative flex-grow flex justify-center shadow-xl">
        {/* main backgorund */}
        <div
          key={isDarkMode ? "dark" : "light"}
          className="fixed inset-0 h-screen w-screen z-0"
          style={background}
        />
        <div className="relative flex justify-center items-start h-full w-[95%] md:w-[90%] lg:w-[80%] z-[1]">
          <Outlet />
        </div>
      </main>
      <ScrollToTopButton />
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
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}
      </style>
    </div>
  );
};

export default MainLayout;
