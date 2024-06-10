import "reflect-metadata";
import express from "express";
import session from "express-session";
import cors from "cors";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/userRoutes";
import elevatorRoutes from "./routes/elevatorRoutes";

AppDataSource.initialize()
  .then(() => {
    const app = express();
    const port = process.env.PORT || 4001;

    app.use(cors({ origin: "http://localhost:4000", credentials: true }));
    app.use(express.json());

    app.use(
      session({
        secret: "blowfish",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
      })
    );

    app.use("/api/users", userRoutes);
    app.use("/api/elevator", elevatorRoutes);
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

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
