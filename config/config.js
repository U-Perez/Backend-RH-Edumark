import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Routes } from "../routes/routes.js";
import { Database } from "../config/db.js";
import { log } from "console";

dotenv.config();

class App {
  app = express.application;
  http = null;
  routes = new Routes();
  db = new Database();
  constructor() {
    this.initApp();
  }
  initApp = async () => {
    this.app = express();
    this.config();
    this.http = http.createServer(this.app);
    this.routes.routes(this.app);
    await this.initDatabase();
  };
  config = async () => {
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "*",
      })
    );
  };
  initDatabase = async () => {
    const connection = await this.db.connection();
    console.log(connection.message);
  };
}

export default new App();
