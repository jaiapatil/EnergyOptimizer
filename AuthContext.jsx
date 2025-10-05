import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("isSubscribed");
    if (saved === "true") {
      setIsSubscribed(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isSubscribed", isSubscribed);
  }, [isSubscribed]);

  return (
    <AuthContext.Provider value={{ isSubscribed, setIsSubscribed }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
