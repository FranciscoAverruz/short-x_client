/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const UserContext = createContext({
  userData: null,
  setUserData: () => {},
  selectedPlan: null,
  setSelectedPlan: () => {},
});

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        selectedPlan,
        setSelectedPlan,
        sessionId,
        setSessionId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
