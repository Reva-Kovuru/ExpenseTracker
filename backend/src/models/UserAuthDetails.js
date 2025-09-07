import mongoose from "mongoose";

const UserAuthDetailsSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        hashedPassword: {
            type: String,
            required: true,
            unique: true,
        },
        emailAddress: {
            type: String,
            required: true,
            unique: true,
        },
        verificationCode: {
            type: String,
            default: "",
        },
        verificationCodeExpireAt: {
            type: Number,
            default: 1000 * 60 * 5, // 5 minutes
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        resetPasswordCode: {
            type: String,
            default: "",
        },
        resetPasswordCodeExpireAt: {
            type: Number,
            default: 1000 * 60 * 5, // 5 minutes
        }
    }
)

const UserAuthDeatils = mongoose.models.userAuth || mongoose.model('userAuth', UserAuthDetailsSchema);

export default UserAuthDeatils;

