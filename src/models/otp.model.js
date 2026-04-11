import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    otpHash: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
);

export const OTP = new mongoose.model("OTP", otpSchema);
