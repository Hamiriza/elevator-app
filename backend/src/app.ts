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
app.use("/about", (req, res) => {
  res.send("About");
});

export default app;
