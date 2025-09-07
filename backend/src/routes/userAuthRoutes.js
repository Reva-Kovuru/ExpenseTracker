import express from "express";

import { userLoginMethod, userRegisterMethod, userLogoutMethod, userEmailVerificationMethod } from "../controllers/userAuthController.js";

const authRouter = express.Router();

authRouter.post('/login', userLoginMethod);
authRouter.post('/register', userRegisterMethod);
authRouter.post('/logout', userLogoutMethod);

authRouter.patch('/sendVerificationCode', userEmailVerificationMethod)

export default authRouter;
