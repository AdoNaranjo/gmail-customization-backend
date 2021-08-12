/* eslint-disable space-before-function-paren */
import { Express } from "express-serve-static-core";
import publicRoutes from "./public";
import apiRoutes from "./api";
import authRoutes from "./auth";

export default class Routes {
  public static configure(app: Express): void {
    app.use("/", publicRoutes);
    app.use("/api", apiRoutes);
    app.use("/auth", authRoutes);
  }
}
