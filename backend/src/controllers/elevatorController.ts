import { Request, Response } from "express";

interface ElevatorParams {
  acceleration: number;
  deceleration: number;
  maxSpeed: number;
  floorHeights: number[];
  startFloor: number;
  endFloor: number;
}

const calculateTravelTime = (req: Request, res: Response) => {
  const {
    acceleration,
    deceleration,
    maxSpeed,
    floorHeights,
    startFloor,
    endFloor,
  }: ElevatorParams = req.body;

  if (
    !validateParams(
      acceleration,
      deceleration,
      maxSpeed,
      floorHeights,
      startFloor,
      endFloor
    )
  ) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const distance = calculateDistance(floorHeights, startFloor, endFloor);
  const time = calculateTime(distance, acceleration, deceleration, maxSpeed);

  return res.json({ travelTime: time });
};

const validateParams = (
  acceleration: number,
  deceleration: number,
  maxSpeed: number,
  floorHeights: number[],
  startFloor: number,
  endFloor: number
) => {
  return (
    acceleration > 0 &&
    deceleration > 0 &&
    maxSpeed > 0 &&
    floorHeights.length > 0 &&
    startFloor >= 0 &&
    endFloor >= 0 &&
    startFloor < floorHeights.length &&
    endFloor < floorHeights.length
  );
};

const calculateDistance = (
  floorHeights: number[],
  startFloor: number,
  endFloor: number
) => {
  if (startFloor === endFloor) return 0;

  let distance = 0;
  const [lowerFloor, upperFloor] = [
    Math.min(startFloor, endFloor),
    Math.max(startFloor, endFloor),
  ];

  for (let i = lowerFloor; i < upperFloor; i++) {
    distance += floorHeights[i];
  }

  return distance;
};

const calculateTime = (
  distance: number,
  acceleration: number,
  deceleration: number,
  maxSpeed: number
) => {
  const accelTime = maxSpeed / acceleration;
  const accelDistance = 0.5 * acceleration * accelTime ** 2;

  const decelTime = maxSpeed / deceleration;
  const decelDistance = 0.5 * deceleration * decelTime ** 2;

  if (distance <= accelDistance + decelDistance) {
    const peakSpeed = Math.sqrt(
      (2 * acceleration * deceleration * distance) /
        (acceleration + deceleration)
    );
    return (2 * peakSpeed) / (acceleration + deceleration);
  } else {
    const cruiseDistance = distance - accelDistance - decelDistance;
    const cruiseTime = cruiseDistance / maxSpeed;
    return accelTime + cruiseTime + decelTime;
  }
};

export { calculateTravelTime };
