import Button from "@atoms/Button.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <motion.h1
        className="text-6xl font-bold text-red-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-xl text-gray-600 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Oops! La página que buscas no existe.
      </motion.p>
      <Link to="/">
        <Button className="mt-6 px-6 py-3 text-lg">Volver al inicio</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
