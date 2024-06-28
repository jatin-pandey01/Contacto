import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

import userRoute from "./routes/user.routes.js";
import contactRoute from './routes/contact.route.js';

app.use("/api/v1/auth",userRoute);
app.use("/api/v1/contact",contactRoute);

export default app;