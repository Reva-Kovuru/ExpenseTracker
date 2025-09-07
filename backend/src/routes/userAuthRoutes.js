import express from "express";

import { userLoginMethod, userRegisterMethod, userLogoutMethod } from "../controllers/userAuthController.js";

const authRouter = express.Router();

authRouter.post('/login', userLoginMethod);
authRouter.post('/register', userRegisterMethod);
authRouter.post('/logout', userLogoutMethod);

export default authRouter;
