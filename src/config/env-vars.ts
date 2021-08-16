import dotenv from "dotenv";
dotenv.config();

export const APP_URL = process.env["APP_URL"];
export const URL = process.env["URL"];
export const PORT = process.env.PORT || 8000;
export const APP_URI = APP_URL ? APP_URL : `${URL}:${PORT}`;
export const APP_DEBUG = Boolean(JSON.parse(String(process.env["APP_DEBUG"]).toLowerCase()));
export const NODE_ENV = process.env.NODE_ENV;
export const MONGODB_URI_SCHEME = process.env["MONGODB_URI_SCHEME"] ? process.env["MONGODB_URI_SCHEME"] : "mongodb";
export const MONGODB_USER = process.env["MONGODB_USER"];
export const MONGODB_PASSWORD = process.env["MONGODB_PASSWORD"];
export const MONGODB_HOST = process.env["MONGODB_HOST"];
export const MONGODB_PORT = process.env["MONGODB_PORT"];
export const MONGODB_DATABASE = process.env["MONGODB_DATABASE"];

let mongoUri = process.env["MONGODB_URL"];
if (!mongoUri) {
  mongoUri = `${MONGODB_URI_SCHEME}://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;
  console.log(mongoUri);
  if (MONGODB_USER) {
    mongoUri = `${MONGODB_URI_SCHEME}://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;
  }
}

export const MONGODB_URI = mongoUri;

export const GOOGLE_CLIENT_ID = process.env["GOOGLE_CLIENT_ID"];
export const GOOGLE_CLIENT_SECRET = process.env["GOOGLE_CLIENT_SECRET"];
export const JWT_SECRET = process.env["JWT_SECRET"];
export const COOKIE_NAME = process.env["COOKIE_NAME"];
