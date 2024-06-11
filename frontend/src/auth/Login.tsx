import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
  }, [auth?.user, history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    auth?.clearError();
    try {
      await auth?.login(username, password);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="container-1">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          className="input-field-1"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          className="input-field-1"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="button-in" type="submit">
          Login
        </button>
        {auth?.error && <div className="error-notif">{auth.error}</div>}
      </form>
    </div>
  );
};

export default Login;
