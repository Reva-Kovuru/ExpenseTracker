import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export const connectExpensesDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI_CLUSTER);
        console.log("MONGODB connected successfully!");
    } catch(error){
        console.log("<<<<<------ MongoDB Connection Failed ------>>>>>", error);
        process.exit(1);
    }
}