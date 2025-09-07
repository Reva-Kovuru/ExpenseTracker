import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.NODE_EMAIL_ADDRESS,
        pass: process.env.NODE_EMAIL_PASSWORD,
    }
})

export default transporter;