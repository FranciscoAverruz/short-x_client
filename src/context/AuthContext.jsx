/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";
import { useJwt } from "react-jwt";

// 🔍 Función para obtener el usuario almacenado en sessionStorage o localStorage
const getUserFromStorage = () => {
  const sessionUser = sessionStorage.getItem("user");
  const localUser = localStorage.getItem("user");

  return sessionUser
    ? JSON.parse(sessionUser)
    : localUser
    ? JSON.parse(localUser)
    : null;
};

// 🔹 Estado inicial
const INITIAL_STATE = {
  user: getUserFromStorage(),
  loading: false,
  error: null,
};

const AuthContext = createContext(INITIAL_STATE);

//  Reducer para manejar acciones de autenticación
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, loading: true, error: null };

    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } };

    case "LOGIN_SUCCESS": {
      const { user, rememberMe } = action.payload;
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      return { user, loading: false, error: null };
    }

    case "LOGIN_FAILURE":
      return { user: null, loading: false, error: action.payload };
    case "LOGOUT":
      sessionStorage.removeItem("user");
      localStorage.removeItem("user");
      return { user: null, loading: false, error: null };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // 🔹 Sincroniza el almacenamiento cuando el usuario cambia
  useEffect(() => {
    if (state.user) {
      const storage = sessionStorage.getItem("user")
        ? sessionStorage
        : localStorage;
      storage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);

  // 🔹 Decodifica el token
  const token = state.user?.token || "";
  const { decodedToken, isExpired } = useJwt(token);
  
  const userId = decodedToken?.id;
  const username = state.user?.username || decodedToken?.username;
  const email = state.user?.email || decodedToken?.email;
  const isAdmin = state.user?.isAdmin || decodedToken?.isAdmin;
  const plan = state.user?.plan || decodedToken?.plan;

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
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };