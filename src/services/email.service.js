import { config } from "../config/config.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: config.googleUser,
        clientId: config.googleClientId,
        clientSecret: config.googleClientSecret,
        refreshToken: config.googleRefreshToken
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Error setting up email transporter:", error);
    } else {
        console.log("Email transporter is ready to send messages");
    }
});

export const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: config.googleUser,
            to,
            subject,
            text,
            html
        });
        console.log("Email sent: ", info.messageId);

    } catch (error) {
        console.error("Error sending email:", error);
    }
}