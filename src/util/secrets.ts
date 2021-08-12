import dotenv from "dotenv";
dotenv.config();

export const GOOGLE_PROJECT_ID = process.env["GOOGLE_PROJECT_ID"];
export const GOOGLE_APPLICATION_CREDENTIALS = process.env["GOOGLE_APPLICATION_CREDENTIALS"];
export const GOOGLE_PUBSUB_TOPIC_NOTIFICATION = process.env["GOOGLE_PUBSUB_TOPIC_NOTIFICATION"];
