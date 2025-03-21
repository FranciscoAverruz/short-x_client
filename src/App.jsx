import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "@home/Home.jsx";
import Login from "@auth/Login.jsx";
import About from "@pages/About.jsx";
import Cancel from "@auth/Cancel.jsx";
import MyUrls from "@dashPage/MyUrls.jsx";
import Privacy from "@pages/Privacy.jsx";
import Contact from "@pages/Contact.jsx";
import Success from "@auth/Success.jsx";
import EditUrl from "@urlShortener/EditUrl ";
import Domains from "@dashPage/Domains.jsx";
import Register from "@auth/Register.jsx";
import NotFound from "@pages/NotFound.jsx";
import MyAccount from "@dashPage/MyAccount.jsx";
import Conditions from "@pages/Conditions.jsx";
import MainLayout from "@layouts/MainLayout.jsx";
import ShortenUrl from "@dashPage/ShortenUrl.jsx";
import UrlDetails from "@dashPage/UrlDetails.jsx";
import ColorPalette from "@pages/ColorPalette.jsx";
import Subscription from "@dashPage/Subscription.jsx";
import RetryPayment from "@dashPage/RetryPayment.jsx";
import VerifyDomain from "./features/dashboard/pages/VerifyDomain";
import ChangePassword from "@myAccount/ChangePassword.jsx";
import DashboardLayout from "@layouts/DashboardLayout.jsx";
import RedirectHandler from "@urlShortener/RedirectHandler.jsx";
import { Toaster } from "sonner";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isTokenValid = () => {
      const token =
        localStorage.getItem("user") || sessionStorage.getItem("user");

      if (!token) return false;

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 > Date.now();
      } catch {
        return false;
      }
    };

    const publicRoutes = [
      "/",
      "/login",
      "/register",
      "/about",
      "/conditions",
      "/privacy",
      "/contact",
    ];

    if (isTokenValid() && publicRoutes.includes(location.pathname)) {
      navigate("/dashboard");
    }
  }, [navigate, location.pathname]);

  return (
    <>
      <Toaster richColors position="top-center" />

      <Routes>
        <Route path="/paleta" element={<ColorPalette />} />

        {/* public   ========================================================== */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Conditions" element={<Conditions />} />
        </Route>

        {/* payment =========================================================== */}
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/success" element={<Success />} />

        {/* redirection ======================================================= */}
        <Route path="/:shortId" element={<RedirectHandler />} />

        {/* dashboard ========================================================= */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<MyAccount />} />
          <Route path="myaccount" element={<MyAccount />} />
          <Route path="domains" element={<Domains />} />
          <Route path="domains/verify-domain" element={<VerifyDomain />} />
          <Route path="password" element={<ChangePassword />} />
          <Route path="urls" element={<MyUrls />} />
          <Route path="urls/:shortId" element={<UrlDetails />} />
          <Route path="urls/:shortId/edit" element={<EditUrl />} />
          <Route path="shorten-url" element={<ShortenUrl />} />
          <Route path="subscription" element={<Subscription />} />
          <Route
            path="subscription/retry-payment/:session_id"
            element={<RetryPayment />}
          />
        </Route>

        {/* 404  ============================================================= */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
