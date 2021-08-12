import express from "express";
import { CheckAuthorization } from "root/controllers/apis/account";

const router = express.Router();

const checkAuthorization = new CheckAuthorization();

router.get("/", checkAuthorization.getMiddlewares(), checkAuthorization.setUp());

export default router;
