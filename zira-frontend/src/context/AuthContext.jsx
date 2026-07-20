import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("zira_token");
    if (!token) { setLoading(false); return; }
    api.me()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("zira_token");
        localStorage.removeItem("zira_user");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (username, password) => {
    const { token, user } = await api.login(username, password);
    localStorage.setItem("zira_token", token);
    setUser(user);
    return user;
  };

  const signup = async (form) => {
    const { token, user } = await api.signup(form);
    localStorage.setItem("zira_token", token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("zira_token");
    setUser(null);
  };

  const updateUser = (u) => setUser(u);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
