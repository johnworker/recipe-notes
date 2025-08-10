import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const KEY = 'auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {id, name, email}

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = ({ email }) => {
    // 假登入：用 email 當 id；可換成真正 API
    const u = { id: email, name: email.split('@')[0], email };
    setUser(u);
    localStorage.setItem(KEY, JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(KEY);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>
    {children}
  </AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
