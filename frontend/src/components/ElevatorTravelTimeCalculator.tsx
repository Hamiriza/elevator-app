import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  setNumberOfFloors,
  setFloorHeight,
  setAcceleration,
  setDeceleration,
  setMaxSpeed,
  setStartFloor,
  setEndFloor,
  setTravelData,
} from "../store/elevatorSlice";
import "./ElevatorTravelTimeCalculator.css";

const ElevatorTravelTimeCalculator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    numberOfFloors,
    floorHeights,
    acceleration,
    deceleration,
    maxSpeed,
    startFloor,
    endFloor,
    travelTime,
    peakSpeed,
  } = useSelector((state: RootState) => state.elevator);

  const [tempNumFloors, setTempNumFloors] = useState<string>(
    numberOfFloors.toString()
  );

  // =============================================================================
  // EFFECTS
  // =============================================================================

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTempNumFloors(numberOfFloors.toString());
  }, [numberOfFloors]);

  // ensures that if floor1 and floor2 exceed number of floors, they are adjusted to valid values
  useEffect(() => {
    if (startFloor >= numberOfFloors) {
      dispatch(setStartFloor(numberOfFloors - 1));
    }
    if (endFloor >= numberOfFloors) {
      dispatch(setEndFloor(numberOfFloors - 1));
    }
  }, [numberOfFloors, startFloor, endFloor, dispatch]);

  // =============================================================================
  // HANDLER
  // =============================================================================

  const handleTempNumFloorsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let intValue = e.target.value;
    if (isNaN(parseInt(intValue)) || parseInt(intValue) > 0) {
      setTempNumFloors(intValue);
    } else {
      setTempNumFloors("1");
    }
  };

  // validates the value when the input loses focus (on blur)
  const handleNumFloorsBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newNumFloors = parseInt(e.target.value);
    if (isNaN(newNumFloors) || newNumFloors < 1) {
      newNumFloors = 1;
    }
    dispatch(setNumberOfFloors(newNumFloors));
  };

  const handleCalculate = async () => {
    const response = await fetch(
      "http://localhost:4001/api/calculate-travel-time",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          acceleration,
          deceleration,
          maxSpeed,
          floorHeights,
          startFloor,
          endFloor,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(setTravelData(data));
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      console.error("Failed to calculate travel time");
    }
  };

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div className="calculator-wrapper">
      <div className="calculator">
        <h1>Elevator Travel Time Calculator</h1>
        <div className="image-wrapper">
          <img src="/elevator.png" alt="elevator" />
        </div>
        <div className="form-group">
          <label htmlFor="numberOfFloors">Number of Floors: </label>
          <input
            id="numberOfFloors"
            type="number"
            value={tempNumFloors}
            onChange={handleTempNumFloorsChange}
            onBlur={handleNumFloorsBlur}
            min={1}
          />
        </div>
        {floorHeights.map((height, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`floorHeight${index}`}>
              Height of Floor {index} (m):{" "}
            </label>
            <input
              id={`floorHeight${index}`}
              type="number"
              value={height}
              onChange={(e) =>
                dispatch(
                  setFloorHeight({ index, height: parseFloat(e.target.value) })
                )
              }
              min={0}
            />
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="acceleration">Acceleration (m/s²):</label>
          <input
            id="acceleration"
            type="number"
            value={acceleration}
            onChange={(e) =>
              dispatch(setAcceleration(parseFloat(e.target.value)))
            }
            min={0}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deceleration">Deceleration (m/s²):</label>
          <input
            id="deceleration"
            type="number"
            value={deceleration}
            onChange={(e) =>
              dispatch(setDeceleration(parseFloat(e.target.value)))
            }
            min={0}
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxSpeed">Max Speed (m/s):</label>
          <input
            id="maxSpeed"
            type="number"
            value={maxSpeed}
            onChange={(e) => dispatch(setMaxSpeed(parseFloat(e.target.value)))}
            min={0}
          />
        </div>
        <div className="form-group">
          <label htmlFor="startFloor">Start Floor: </label>
          <input
            id="startFloor"
            type="number"
            value={startFloor}
            onChange={(e) =>
              dispatch(
                setStartFloor(
                  Math.min(
                    Math.max(0, parseInt(e.target.value) || 0),
                    numberOfFloors - 1
                  )
                )
              )
            }
            min={0}
            max={numberOfFloors - 1}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="endFloor">End Floor: </label>
          <input
            id="endFloor"
            type="number"
            value={endFloor}
            onChange={(e) =>
              setEndFloor(
                Math.min(
                  Math.max(0, parseInt(e.target.value) || 0),
                  numberOfFloors - 1
                )
              )
            }
            min={0}
            max={numberOfFloors - 1}
          ></input>
        </div>
        <button onClick={handleCalculate}>Calculate</button>
        {travelTime !== null && (
          <div className="result" ref={resultRef}>
            <p>Estimated travel time: {travelTime.toFixed(2)} seconds</p>
            <p>Peak speed: {peakSpeed?.toFixed(2)} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElevatorTravelTimeCalculator;
