import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import { calculateTravelTime } from "../controllers/elevatorController";

const app = express();
app.use(bodyParser.json());
app.post("/api/calculate-travel-time", calculateTravelTime);

describe("POST /api/calculate-travel-time", () => {
  it("should return travel time and peak speed", async () => {
    const response = await request(app)
      .post("/api/calculate-travel-time")
      .send({
        acceleration: 1,
        deceleration: 1,
        maxSpeed: 2,
        floorHeights: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        startFloor: 0,
        endFloor: 9,
      });

    expect(response.status).toBe(200);
    expect(response.body.travelTime).toBeCloseTo(15.5, 1);
    expect(response.body.peakSpeed).toBeCloseTo(2, 1);
  });

  it("should return 400 for invalid parameters", async () => {
    const response = await request(app)
      .post("/api/calculate-travel-time")
      .send({
        acceleration: -1,
        deceleration: 1,
        maxSpeed: 2,
        floorHeights: [3, 3, 3, 3, 3],
        startFloor: 0,
        endFloor: 5,
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid parameters");
  });
});
