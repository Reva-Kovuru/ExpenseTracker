import express from "express";

import { userLoginMethod,
        userRegisterMethod, userLogoutMethod, sendVerificationCodeMethod, verifyUserEmailMethod } from "../controllers/userAuthController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post('/login', userLoginMethod);
authRouter.post('/register', userRegisterMethod);
authRouter.patch('/logout', userLogoutMethod);

authRouter.post('/send-VerificationCode', userAuth, sendVerificationCodeMethod);
authRouter.post('/verify-emailaccount', userAuth, verifyUserEmailMethod);

export default authRouter;
