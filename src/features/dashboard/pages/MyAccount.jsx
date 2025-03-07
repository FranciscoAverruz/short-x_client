import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "@myAccount/UserInfo.jsx";
import Actions from "@myAccount/Actions.jsx";
import { API_URL } from "@src/Env.jsx";
import { AuthContext } from "@context/AuthContext";
import useAuthAxios from "@hooks/useAuthAxios";
import useUserUrlsStats from "@hooks/useUserUrlsStats.jsx";
import { Loader } from "@common/Loader.jsx";
import { motion, AnimatePresence } from "framer-motion";

const MyAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { userId } = useContext(AuthContext);
  const authAxios = useAuthAxios();
  const { loading, totalUrls } = useUserUrlsStats();
  const { user: contextUser  } = useContext(AuthContext);

  useEffect(() => {
    if (!contextUser || !userId) { 
      return 
    }
    
    const fetchUserData = async () => {
      try {
        const userRes = await authAxios.get(`${API_URL}/user/${userId}`);
        setUser(userRes.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [contextUser, userId, authAxios]);

  if (loading) {
    return (
      <Loader
        type="loading"
        text="Cargando..."
        className="flex items-center justify-center h-[90%]"
      />
    );
  }

  const handleRedirectToMyUrls = () => {
    navigate("/dashboard/urls");
  };

  return (
    <AnimatePresence>
      <h1 className="title dashGrlHeadings text-2xl">My Account</h1>
    <motion.main
      key="myAccountMain"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="md:max-w-xl lg:max-w-5xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-[1fr_auto] grid-rows-auto gap-4 md:gap-6 h-fit">
        {/* User info */}
        <article className="row-span-1 col-span-1 grlContainer md:p-8 flex items-center">
          {user && (
            <UserInfo
              user={user}
              setUser={setUser}
              isCancellationPending={user.isCancellationPending}
            />
          )}
        </article>

        {/* Actions */}
        <section className="row-span-1 col-span-1 flex items-center justify-center w-full h-full">
          {user && (
            <Actions
              user={user}
              handleRedirectToMyUrls={handleRedirectToMyUrls}
              totalUrls={totalUrls}
            />
          )}
        </section>
      </section>
    </motion.main>
</AnimatePresence>
  );
};

export default MyAccount;
