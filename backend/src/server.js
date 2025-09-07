import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectExpensesDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }))

connectExpensesDB().then( () => {
    app.listen(PORT, () => {
        console.log(">>>>>>>>--------Server is up and Running!---------<<<<<<<<")
    });
})




