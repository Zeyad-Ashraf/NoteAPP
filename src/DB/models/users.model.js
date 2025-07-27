import mongoose from "mongoose";
import { hashPassword } from "../../utils/index.js";

export const EnumRoles = {
    admin: "admin",
    user: "user",
    system: "system",
    assistant: "assistant",
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(EnumRoles),
        default: EnumRoles.user,
    },
    otp: {
        code: {
            type: String,
        },
        expiry: {
            type: Date,
            default: Date.now() + 1000 * 60 * 60 * 24,
        },
    },
    path: {
        type: String,
    }
}, {
    timestamps: true,
    versionKey: false,
});

UserSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await hashPassword(this.password);
    }
});



export const userModel = mongoose.model("User", UserSchema);

userModel.createIndexes({ email: 1, confirmed: 1 });