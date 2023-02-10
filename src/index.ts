import express from "express";
import { Server } from "node:http";
import { Application } from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";

import dotenv from "dotenv";
import connection from "../db";
import User from "./entities/User";

dotenv.config();

declare module 'express-session' {
  interface SessionData {
    token?: string;
    user?: typeof User;
  }
}

export class App {
  public app: Application;
  private server: Server;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(
      session({
        secret: "mysecretkey", // Secret key for signing the session ID cookie
        resave: false, // Don't resave the session if it wasn't modified
        saveUninitialized: false, // Don't save uninitialized sessions
        cookie: {
          secure: process.env.NODE_ENV === "production", // Only set the cookie over HTTPS in production
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7 day cookie lifetime
        }
      })
    );
    this.configureRoutes();
    this.executeApp();
  }

  private configureRoutes() {
    const routesFolder = path.join(__dirname, "endpoints");
    fs.readdirSync(routesFolder).forEach((file) => {
      const router = require(path.join(routesFolder, file)).default;
      const baseRoute = file.replace("Router.ts", "");
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
