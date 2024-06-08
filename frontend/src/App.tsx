import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ElevatorTravelTimeCalculator from "./components/ElevatorTravelTimeCalculator";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculate" Component={ElevatorTravelTimeCalculator} />
          <Route path="/about" Component={AboutPage} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
