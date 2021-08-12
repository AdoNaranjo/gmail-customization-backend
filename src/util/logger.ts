import { NODE_ENV } from "root/config/env-vars";
import winston from "winston";

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: NODE_ENV === "prod" ? "error" : "debug"
    }),
    new winston.transports.File({ filename: "debug.log", level: "debug" }),
  ]
};

const logger = winston.createLogger(options);

if (NODE_ENV !== "prod") {
  logger.debug("Logging initialized at debug level");
}

export default logger;
