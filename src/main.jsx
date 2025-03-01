/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@src/App.jsx";
import "@src/index.css";
import AuthContextProvider from "@context/AuthContext.jsx";
import { FormDataProvider } from "@context/FormDataContext";
import { STRIPE_PROMISE } from "@src/Env.jsx";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { UserProvider } from "@context/UserContext.jsx";

const stripePromise = loadStripe(STRIPE_PROMISE);
// import '@src/i18n';
// import  { LanguageProvider }  from '@context/LanguageContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
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
  // </React.StrictMode>,
);
