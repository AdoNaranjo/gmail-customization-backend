import express from "express";
import { GetGoogleAuthURL, SaveAuthCode } from "root/controllers/auth";

const router = express.Router();

const googleAuthURL = new GetGoogleAuthURL();
const saveAuthCode = new SaveAuthCode();

router.get("/url", googleAuthURL.getMiddlewares(), googleAuthURL.setUp());
router.get("/success", saveAuthCode.getMiddlewares(), saveAuthCode.setUp());

export default router;
