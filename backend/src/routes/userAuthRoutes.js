import express from "express";

import { userLoginMethod, userRegisterMethod, userLogoutMethod, sendVerificationCodeMethod, verifyUserEmailMethod } from "../controllers/userAuthController.js";

const authRouter = express.Router();

authRouter.post('/login', userLoginMethod);
authRouter.post('/register', userRegisterMethod);
authRouter.post('/logout', userLogoutMethod);

authRouter.patch('/sendVerificationCode', sendVerificationCodeMethod)
authRouter.patch('/verifyVerificationCode', verifyUserEmailMethod)

export default authRouter;
