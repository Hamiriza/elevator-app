import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4001";
axios.defaults.withCredentials = true;

interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  success: string | null;
  clearError: () => void;
  clearSuccess: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
    try {
      await axios.post("/api/users/login", { username, password });
      const response = await axios.get("/api/users/me");
      setUser(response.data);
      setError(null);
    } catch (err) {
      setError("Invalid username or password");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await axios.post("/api/users/register", { username, password });
      setSuccess("Account created successfully");
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (err) {
      setError("Username already exists");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const logout = async () => {
    await axios.post("/api/users/logout");
    setUser(null);
  };

  const clearError = () => {
    setError(null);
  };

  const clearSuccess = () => {
    setSuccess(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        error,
        success,
        clearError,
        clearSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
