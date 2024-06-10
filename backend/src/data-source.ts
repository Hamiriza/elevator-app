import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
const ormConfig = require("../ormconfig.json");

export const AppDataSource = new DataSource({
  ...ormConfig,
  entities: [User],
});
