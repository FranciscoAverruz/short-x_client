import { useEffect } from "react";
import Button from "@atoms/Button.jsx";
import { motion } from "framer-motion";
import AuthLayout from "@auth/AuthLayout";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      html.classList.add("dark");
    } else if (storedTheme === "light") {
      html.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  }, []);

  return (
    <main className="flex w-screen h-screen items-center justify-center bg-light-gradient dark:bg-dark-gradient">

      <AuthLayout
        classNameAL="flex px-20 text-center"
        formContent={
          <div className="flex flex-col w-full">
            <motion.h1
              className="text-6xl font-bold text-red-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              404
            </motion.h1>
            <motion.p
              className="text-xl text-light-Title dark:text-dark-Title mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Oops! La página que buscas no existe.
            </motion.p>
            <Button
              label="Volver al inicio"
              variant="primary"
              onClick={() => navigate("/")}
              icon={IoReturnUpBack}
              className="font-bold mt-5 md:ml-1"
            />
          </div>
        }
      />
    </main>
  );
};

export default NotFoundPage;
