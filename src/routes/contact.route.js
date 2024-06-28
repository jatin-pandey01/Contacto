import { createContact, editContact, searchContact } from "../controller/contact.controller.js";
import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/create").post(verifyJWT,createContact);

router.route("/edit").patch(verifyJWT,editContact);

router.route("/search").get(verifyJWT,searchContact);

export default router;