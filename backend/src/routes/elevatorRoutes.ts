import { Router } from "express";
import { calculateTravelTime } from "../controllers/elevatorController";

const router = Router();

router.post("/calculate-travel-time", calculateTravelTime);

export default router;
