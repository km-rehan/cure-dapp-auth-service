import { Document, Schema } from "mongoose";
import { Profile } from "./profile.model";
import { Wallet } from "./wallet.model";

export class User extends Document {

    walletAddress: string;

    profileId: Profile["_id"];

    isKycDone: boolean;

    activated: boolean;

    doctor: boolean;

    wallets: [Wallet["_id"]];

    walletCreationInProgress: boolean;

    isUserVerified: boolean;
}

export const UserSchema = new Schema({
    walletAddress: {
        type: String,
        trim: true,
        unique: true,
        immutable: true
    },

    profileId: {
        type: Schema.Types.ObjectId,
        ref: "Profile"
    },
    
    isKycDone: {
        type: Boolean,
        default: false
    },

    activated: {
        type: Boolean,
        default: false
    },

    doctor: {
        type: Boolean,
        default: false
    },
    
    wallets: [{
        type: Schema.Types.ObjectId,
        ref: "Wallet"
    }],
    
    walletCreationInProgress: {
        type: Boolean,
        default: false
    },

    isUserVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: User.name
});