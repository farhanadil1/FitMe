// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [isAdminLogin, setIsAdmin] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsUserLogin(!!user);
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsUserLogin(true);
  };
  const adminLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("usertype","admin");
    setIsAdmin(true);
  };
  const logout = () => {
    localStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("usertype");
    setIsUserLogin(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isUserLogin, login, logout,adminLogin,isAdminLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
