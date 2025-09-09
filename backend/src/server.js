import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectExpensesDB } from "./config/db.js";
import authRouter from "./routes/userAuthRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    corsOptions
));

app.use('/api/auth', authRouter);

connectExpensesDB().then( () => {
    app.listen(PORT, () => {
        console.log(">>>>>>>>--------Server is up and Running!---------<<<<<<<<")
    });
})




