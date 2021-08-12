import express from "express";
import { GetContact } from "root/controllers/apis/contacts";

const router = express.Router();

const getContact = new GetContact();

router.get("/", getContact.getMiddlewares(), getContact.setUp());

export default router;
