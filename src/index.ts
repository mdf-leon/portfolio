import express from "express";
import { Server } from "node:http";
import { Application } from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";

import dotenv from "dotenv";
import connection from "../db";

dotenv.config();

export class App {
  public app: Application;
  private server: Server;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.configureRoutes();
    this.executeApp();
  }

  private configureRoutes() {
    const routesFolder = path.join(__dirname, "routes");
    fs.readdirSync(routesFolder).forEach((file) => {
      const router = require(path.join(routesFolder, file)).default;
      const baseRoute = file.replace(".ts", "");
      this.app.use(`/api/${baseRoute}`, router);
    });
  }

  public async closeApp() {
    await connection.destroy();
    if (this.server.closeAllConnections) await this.server.closeAllConnections()
    // process.exit()
  }

  public getAppServer() {
    return this.server;
  }

  public async executeApp() {
    if (process.env.NODE_ENV !== "test") {
      this.server = this.app.listen(process.env.APP_PORT || 3333);
    } else {
      this.server = await this.app.listen(0);
    }
  }
}

export default new App().app;
