import { register,login,getUser } from "../controller/user.controller.js";
import express from "express";
import { verifyJWT } from "../src/middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/user").get(verifyJWT,getUser);

export default router;