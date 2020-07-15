import { Document, Schema } from "mongoose";
import { User } from "./user.model";

export class Profile extends Document {
    userId: User["_id"];
    kycverified: boolean;
    firstname: string;
    lastname: string;
    email: string;
    mobile: string;
    avatar: string;
    address: string;
    city: string;
    country: string;
    state: string;
    pinCode: number;
    gender: string;
    dateOfBirth: Date;
    secondaryEmail: string;
    secondaryPhone: string;
    bloodGroup: string;
    language: string;
    timeZone: Date;
}

export const ProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    kycverified: {
        type: Boolean,
        default: false
    },

    firstname: {
        type: String,
        sparse: true
    },

    lastname: {
        type: String,
        sparse: true
    },

    email: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        sparse: true
    },

    mobile: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        sparse: true
    },

    avatar: {
        type: String,
    },

    address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    pinCode: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true,
        enum: [
            "Male",
            "Female"
        ],
    },

    dateOfBirth: {
        type: Date,
        required: true
    },

    secondaryEmail: {
        type: String,
        required: true
    },

    secondaryPhone: {
        type: String,
        required: true
    },

    bloodGroup: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true
    },

    timeZone: {
        type: Date
    }
}, {
    timestamps: true,
    collection: Profile.name
})