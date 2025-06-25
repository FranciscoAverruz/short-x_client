/* eslint-disable react/prop-types */
import useAuthAxios from "@hooks/useAuthAxios";
import { useJwt } from "react-jwt";
import { API_URL } from "@src/Env.jsx";
import { logError } from "@utils/logger";
import { createContext, useEffect, useReducer } from "react";

const getUserFromStorage = () => {
  const sessionUser = sessionStorage.getItem("user");
  const localUser = localStorage.getItem("user");
  return sessionUser
    ? JSON.parse(sessionUser)
    : localUser
    ? JSON.parse(localUser)
    : null;
};

const INITIAL_STATE = {
  user: getUserFromStorage(),
  loading: false,
  error: null,
  subscription: null,
  paymentHistory: [],
};

const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, user: null, loading: true, error: null };

    case "LOGIN_SUCCESS": {
      const { user, rememberMe } = action.payload;

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      return { ...state, user, loading: false, error: null };
    }

    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_SUBSCRIPTION":
      if (!action.payload) {
        return {
          ...state,
          subscription: null,
          user: { ...state.user, plan: null },
        };
      }
      return {
        ...state,
        subscription: {
          ...state.subscription,
          plan: action.payload.plan,
          status: action.payload.status,
          startDate: action.payload.startDate,
          renewalDate: action.payload.renewalDate,
        },
        user: {
          ...state.user,
          plan: action.payload.plan,
        },
      };

    case "SET_PAYMENT_HISTORY":
      return {
        ...state,
        paymentHistory: Array.isArray(action.payload) ? action.payload : [],
      };

    case "LOGIN_FAILURE":
      return { ...state, user: null, loading: false, error: action.payload };

    case "LOGOUT":
      sessionStorage.removeItem("user");
      localStorage.removeItem("user");
      return {
        user: null,
        loading: false,
        error: null,
        subscription: null,
        paymentHistory: null,
      };

    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const authAxios = useAuthAxios();

  const token = state.user?.token || "";

  const { decodedToken } = useJwt(token);
  const userId = decodedToken?.id;
  const username = state.user?.username || decodedToken?.username;
  const email = state.user?.email || decodedToken?.email;
  const isAdmin = state.user?.isAdmin || decodedToken?.isAdmin;
  const plan = state.user?.plan || decodedToken?.plan;
  const startDate = decodedToken?.startDate;

  // user's subscription
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!userId || (state.subscription && state.subscription.status)) return;

      dispatch({ type: "SET_LOADING", payload: true });

      try {
        if (!authAxios) {
          logError("No hay instancia de authAxios disponible.");
          return;
        }

        const response = await authAxios.get(
          `${API_URL}/subscription/${userId}/info`
        );
        dispatch({
          type: "SET_SUBSCRIPTION",
          payload: response.data.subscription,
        });
      } catch (err) {
        logError("Error al obtener la suscripción:", err);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchSubscription();
  }, [userId, authAxios, state.subscription, token]);

  // Gets payment history
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (!userId || (state.paymentHistory && state.paymentHistory.length > 0))
        return;

      dispatch({ type: "SET_LOADING", payload: true });

      try {
        if (!authAxios) {
          logError("No hay instancia de authAxios disponible.");
          return;
        }

        const response = await authAxios.get(
          `${API_URL}/subscription/${userId}/payment-history`
        );
        dispatch({
          type: "SET_PAYMENT_HISTORY",
          payload: Array.isArray(response.data.payments)
            ? response.data.payments
            : [],
        });
      } catch (err) {
        logError("Error al obtener historial de pagos:", err);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchPaymentHistory();
  }, [userId, authAxios, state.paymentHistory]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        userId,
        username,
        email,
        isAdmin,
        plan,
        startDate,
        subscription: state.subscription,
        paymentHistory: state.paymentHistory,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };
