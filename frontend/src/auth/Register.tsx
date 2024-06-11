import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    auth?.clearError();
    auth?.clearSuccess();
    try {
      await auth?.register(username, password);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="container-1">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
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
          Register
        </button>
        {auth?.error && <div className="error-notif">{auth.error}</div>}
        {auth?.success && <div className="success-notif">{auth.success}</div>}
      </form>
    </div>
  );
};

export default Register;