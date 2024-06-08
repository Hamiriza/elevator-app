import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import elevatorRoutes from "./routes/elevatorRoutes";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api", elevatorRoutes);
app.use("/ping", (req, res) => {
  res.json({ response: "pong!!!" });
});
app.use("/info", (req, res) => {
  res.json({
    model: "SuperFast 3000",
    capacity: 15,
    manufacturer: "Elevator Co.",
    year: 2023,
  });
});

export default app;
