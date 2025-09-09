import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserAuthDeatils from "../models/UserAuthDetails.js";
import transporter from "../config/nodeMailer.js";


export const userRegisterMethod = async (req, res) => {
    const { userName, email, password } = req.body;

    if(!userName || !email || !password){
        return res.status(400).json({"message": "Few Required details are missing!"});
    }
    
    try{
        const existingUserEmail = await UserAuthDeatils.findOne({email});
        const existingUser = await UserAuthDeatils.findOne({userName});
        if(existingUser || existingUserEmail){
            return res.status(200).json({"message": "email or User Name alerady exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserAuthDeatils({userName, hashedPassword, email});
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "7d"});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days.
        });

        return res.status(201).json({"message": "User Registered successfully"});
    } catch(error){
        console.log("----------- ERROR [USERREGISTERMETHOD] ---------------", error);
        return res.status(500).json({"message": "Server Got Stumped!!! Sorry..."});
    }
}

export const userLoginMethod = async (req, res) => {
    
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({"message": "Few Required details are missing!"});
    }
    
    try {
        const user = await UserAuthDeatils.findOne({email});
        if(!user){
            return res.status(200).json({"message": "Incorrect details! Please check and try again"});
        }
        
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if(!isMatch){
            return res.status(200).json({"message": "Incorrect details! Please check and try again"});
        }
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "7d"});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days.
        });
        console.log("user logged in!")
        return res.status(201).json({"message": "User Logged in successfully"});
    } catch (error) {
        console.log("----------- ERROR [userLoginMethod] ---------------", error);
        return res.status(500).json({"message": "Server Got Stumped!!! Sorry..."});
    }
}

export const userLogoutMethod = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
        })

        return res.status(200).json({"message": "User Logged Out Successfully"});
    } catch (error) {
        console.log("----------- ERROR [userLogoutMethod] ---------------", error);
        return res.status(500).json({"message": "Server Got Stumped!!! Sorry..."});
    }
}

export const sendVerificationCodeMethod = async (req, res) => {
    const userid = req.user.id;

    try {
        const user = await UserAuthDeatils.findOne({_id: userid });
        if(!user){
            return res.status(401).json({"message": `Incorrect e-mail! User doesn't exist`});
        }
        if(user.isVerified){
            return res.status(200).json({"message": "User e-mail already Verified"});
        }

        const codevalue = Math.floor(Math.random() * 1000000).toString();

        let info = await transporter.sendMail({
            from: process.env.NODE_EMAIL_ADDRESS,
            to: user.email,
            subject: "Verification Code - ExpenseTracker",
            html: '<p>Here is the verification code. Please enter this to get your e-mail verified.</p><br><br><h1>' + codevalue + '</h1>',
        })

        if(info.accepted[0] === user.email){
            const hashedCode = await bcrypt.hash(codevalue, 10);
            user.verificationCode = hashedCode;
            user.verificationCodeExpireAt = Date.now() + 1000 * 60 * 10; // 10 mins
            await user.save();
            return res.status(200).json({"message": "Verification code sent. Valid for 10 minutes"});
        }
        return res.status(400).json({"message": "!!!!!!!!Verification code NOT sent!!!!!!!!"});
    } catch (error) {
        console.log("----------- ERROR [sendVerificationCodeMethod] ---------------", error);
        return res.status(500).json({"message": "Server Got Stumped!!! Sorry..."});
    }
}

export const verifyUserEmailMethod = async (req, res) => {
    const userid = req.user.id;
    const { codevalue } = req.body;
    
    if(!codevalue){
        return res.status(400).json({"message": "OTP is missing"});
    }
    try {
        const user = await UserAuthDeatils.findOne({_id: userid});
        if(!user){
            return res.status(200).json({"message": "Incorrect e-mail! Please check and try again"});
        }
        if(!user.verificationCode){
            return res.status(400).json({"message": "Unknown OTP error"});
        }
        if(Date.now() > user.verificationCodeExpireAt){
            return res.status(400).json({"message": "OTP Timed out!"});
        }
        const isMatch = await bcrypt.compare(codevalue, user.verificationCode);
        if(!isMatch){
            return res.status(200).json({"message": "Incorrect OTP! Please check and try again"});
        }
        user.verificationCode = "";
        user.isVerified = true;
        await user.save();
        return res.status(200).json({"message": "e-mail Verified! Thank You."});
    } catch (error) {
        console.log("----------- ERROR [verifyUserEmailMethod] ---------------", error);
        return res.status(500).json({"message": "Server Got Stumped!!! Sorry..."});
    }
}