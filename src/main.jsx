/* eslint-disable no-unused-vars */
import App from "@src/App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import AuthContextProvider from "@context/AuthContext.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_KEY } from "@src/Env.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { UserProvider } from "@context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { FormDataProvider } from "@context/FormDataContext";
import "@src/index.css";
import "@src/scroll.css";

const stripePromise = loadStripe(STRIPE_KEY);
// import '@src/i18n';
// import  { LanguageProvider }  from '@context/LanguageContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <AuthContextProvider>
      <Elements stripe={stripePromise}>
        <FormDataProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FormDataProvider>
      </Elements>
    </AuthContextProvider>
  </UserProvider>
);
