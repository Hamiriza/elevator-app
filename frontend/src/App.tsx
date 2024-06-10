import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ElevatorTravelTimeCalculator from "./components/ElevatorTravelTimeCalculator";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" Component={AboutPage} />
            <Route path="/calculate" Component={ElevatorTravelTimeCalculator} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
