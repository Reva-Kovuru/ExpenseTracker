import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserAuthDeatils from "../models/UserAuthDetails.js";

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