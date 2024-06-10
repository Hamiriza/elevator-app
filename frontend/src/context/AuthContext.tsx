import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4001";
axios.defaults.withCredentials = true;

interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    axios
      .get("/api/users/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const login = async (username: string, password: string) => {
    await axios.post("/api/users/login", { username, password });
    const response = await axios.get("/api/users/me");
    setUser(response.data);
  };

  const register = async (username: string, password: string) => {
    await axios.post("/api/users/register", { username, password });
    await login(username, password);
  };

  const logout = async () => {
    await axios.post("/api/users/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
