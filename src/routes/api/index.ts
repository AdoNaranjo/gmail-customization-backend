import express from "express";
import account from "./account";
import contact from "./contacts";

const router = express.Router();

router.use("/account", account);
router.use("/contacts", contact);

export default router;
