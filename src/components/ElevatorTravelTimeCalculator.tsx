import React, { useEffect, useState } from "react";
import { Elevator } from "../Elevator";
import "./ElevatorTravelTimeCalculator.css";

const ElevatorTravelTimeCalculator: React.FC = () => {
  const [numFloors, setNumFloors] = useState<number>(5);
  const [tempNumFloors, setTempNumFloors] = useState<string>(
    numFloors.toString()
  );
  const [floorHeights, setFloorHeights] = useState<number[]>(
    Array(numFloors).fill(3)
  );
  const [acceleration, setAcceleration] = useState<number>(1.0);
  const [deceleration, setDeceleration] = useState<number>(1.0);
  const [maxSpeed, setMaxSpeed] = useState<number>(1.0);
  const [floor1, setFloor1] = useState(0);
  const [floor2, setFloor2] = useState(0);
  const [travelTime, setTravelTime] = useState<number | null>(null);

  // =============================================================================
  // EFFECTS
  // =============================================================================

  // ensures that if floor1 and floor2 exceed number of floors, they are adjusted to valid values
  useEffect(() => {
    if (floor1 >= numFloors) {
      setFloor1(numFloors - 1);
    }
    if (floor2 >= numFloors) {
      setFloor2(numFloors - 1);
    }
  }, [numFloors, floor1, floor2]);

  // =============================================================================
  // HANDLER
  // =============================================================================

  const handleTempNumFloorsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTempNumFloors(e.target.value);
  };

  // validates the value when the input loses focus (on blur)
  const handleNumFloorsBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newNumFloors = parseInt(e.target.value);
    if (isNaN(newNumFloors) || newNumFloors < 1) {
      newNumFloors = 1;
    }
    setNumFloors(newNumFloors);
    setFloorHeights(Array(newNumFloors).fill(3));
  };

  const handleFloorHeightChange = (index: number, value: number) => {
    const newFloorHeights = [...floorHeights];
    newFloorHeights[index] = value;
    setFloorHeights(newFloorHeights);
  };

  const handleCalculate = () => {
    const elevator = new Elevator(
      acceleration,
      deceleration,
      maxSpeed,
      floorHeights
    );
    const time = elevator.calculateTravelTime(floor1, floor2);
    setTravelTime(time);
  };

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div className="calculator-wrapper">
      <div className="calculator">
        <h1>Elevator Travel Time Calculator</h1>
        <div className="form-group">
          <label>Number of Floors: </label>
          <input
            type="number"
            value={tempNumFloors}
            onChange={handleTempNumFloorsChange}
            onBlur={handleNumFloorsBlur}
            min={1}
          />
        </div>
        {floorHeights.map((height, index) => (
          <div key={index} className="form-group">
            <label>Height of Floor {index} (m): </label>
            <input
              type="number"
              value={height}
              onChange={(e) =>
                handleFloorHeightChange(index, parseFloat(e.target.value))
              }
              min={0}
            />
          </div>
        ))}
        <div className="form-group">
          <label>Acceleration (m/s²)</label>
          <input
            type="number"
            value={acceleration}
            onChange={(e) => setAcceleration(parseFloat(e.target.value))}
            min={0}
          />
        </div>
        <div className="form-group">
          <label>Deceleration (m/s²)</label>
          <input
            type="number"
            value={deceleration}
            onChange={(e) => setDeceleration(parseFloat(e.target.value))}
            min={0}
          />
        </div>
        <div className="form-group">
          <label>Max Speed (m/s):</label>
          <input
            type="number"
            value={maxSpeed}
            onChange={(e) => setMaxSpeed(parseFloat(e.target.value))}
            min={0}
          />
        </div>
        <div className="form-group">
          <label>Start Floor: </label>
          <input
            type="number"
            value={floor1}
            onChange={(e) => setFloor1(parseInt(e.target.value))}
            min={0}
            max={numFloors - 1}
          ></input>
        </div>
        <div className="form-group">
          <label>End Floor: </label>
          <input
            type="number"
            value={floor2}
            onChange={(e) => setFloor2(parseInt(e.target.value))}
            min={0}
            max={numFloors - 1}
          ></input>
        </div>
        <button onClick={handleCalculate}>Calculate</button>
        {travelTime !== null && (
          <div className="result">
            Estimated travel time: {travelTime.toFixed(2)} seconds
          </div>
        )}
      </div>
    </div>
  );
};

export default ElevatorTravelTimeCalculator;
