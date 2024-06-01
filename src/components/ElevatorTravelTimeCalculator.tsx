import React, { useState } from "react";
import { Elevator } from "../Elevator";

const ElevatorTravelTimeCalculator: React.FC = () => {
  const [floor1, setFloor1] = useState(0);
  const [floor2, setFloor2] = useState(0);
  const [travelTime, setTravelTime] = useState<number | null>(null);

  const handleCalculate = () => {
    const floorHeights = [3, 4, 3, 5, 4];
    const elevator = new Elevator(1.0, 1.0, 2.0, floorHeights);
    const time = elevator.calculateTravelTime(floor1, floor2);
    setTravelTime(time);
  };

  return (
    <div>
      <h1>Elevator Travel Time Calculator</h1>
      <div>
        <label>Start Floor: </label>
        <input
          type="number"
          value={floor1}
          onChange={(e) => setFloor1(parseInt(e.target.value))}
        ></input>
      </div>
      <div>
        <label>End Floor: </label>
        <input
          type="number"
          value={floor2}
          onChange={(e) => setFloor2(parseInt(e.target.value))}
        ></input>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {travelTime !== null && (
        <div>Estimated travel time: {travelTime.toFixed(2)} seconds</div>
      )}
    </div>
  );
};

export default ElevatorTravelTimeCalculator;
