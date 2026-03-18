import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    refreshTokenHash: {
        type: String,
        required: [true, "refreshTokenHash is required"]
    },
    ip: {
        type: String,
        required: [true, "IP Address is required"]
    },
    userAgent: {
        type: String,
        required: [true, "userAgent is required"]
    },
    revoked: {
        type: Boolean,
        default: false
    },

},
    {
        timestamps: true
    }
)

export const Session = new mongoose.model("Session", sessionSchema);