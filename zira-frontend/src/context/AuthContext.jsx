import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check for existing token
  useEffect(() => {
    const token = localStorage.getItem("zira_token");
    if (!token) { setLoading(false); return; }
    api.me()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("zira_token");
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

  // Google Auth — redirects user to backend Google OAuth endpoint
  const loginWithGoogle = () => {
    window.location.href = api.googleAuthUrl();
  };

  // Handle callback from Google OAuth (called from AuthCallback page)
  const handleGoogleCallback = ({ token, name, email, avatar }) => {
    localStorage.setItem("zira_token", token);
    // Set a basic user object — /me will fetch full details
    setUser({ name, email, avatar, username: `google_user`, role: "customer" });
    // Fetch full profile
    api.me().then(setUser).catch(() => {});
  };

  const logout = () => {
    localStorage.removeItem("zira_token");
    setUser(null);
  };

  const updateUser = (u) => setUser(u);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, handleGoogleCallback, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

