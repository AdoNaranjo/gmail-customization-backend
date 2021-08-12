/* eslint-disable space-before-function-paren */
import "module-alias/register";
import "source-map-support/register";
import "reflect-metadata";
import express, { Express } from "express";
import path from "path";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import mongoose from "mongoose";
import connectMongo from "./database/connect";
import Router from "./routes";
import ErrorHandler from "./exceptions/handler";
import errorHandler from "errorhandler";
import { MONGODB_URI, APP_PORT } from "./config/env-vars";
import { modelProvider } from "./providers";
import cors from "cors";
class Server {
  public app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.mongo();
    this.DIProviders();
  }

  public routes(): void {
    // Register router
    Router.configure(this.app);
    // Handle 404
    // Default Error Handler
    this.app.use(ErrorHandler);
    this.app.use("/public", express.static(path.join(__dirname, "public")));
  }

  public config(): void {
    this.app.disable("x-powered-by");
    this.app.set("port", APP_PORT);
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ type: "application/*+json" }));
    this.app.use(bodyParser.raw({ type: "application/vnd.api+json" }));
    this.app.use(bodyParser.text({ type: "text/html" }));
    this.app.set("etag", false);
  }

  private mongo() {
    connectMongo(mongoose, MONGODB_URI);
  }

  public DIProviders() {
    modelProvider();
  }

  public start(): void {
    this.app.use(errorHandler());
    this.app.listen(this.app.get("port"), () => {
      console.log("  App is running at http://localhost:%d in %s mode", this.app.get("port"), this.app.get("env"));
      console.log("  Press CTRL-C to stop\n");
    });
  }
}
export default Server;
