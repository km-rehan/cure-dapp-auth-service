/* eslint-disable @typescript-eslint/no-unused-vars */
import { Document, Schema } from "mongoose";
import * as beautifyUnique from "mongoose-beautiful-unique-validation";
import * as mongoose_delete from "mongoose-delete";
import * as dataTables from "mongoose-datatables";
import { User } from "./user.model";

export class Wallet extends Document {
    user: User["_id"];
    currency: string;
    totalCredit: string;
    totalUsed: string;
    balance: string;
    TFCGenerated: string;
    withdrawBalance: string;
    activateDate: Date;
    expiryDate: Date;
    active: boolean;
    walletAddress: string;
    walletPassword: string;
    accountAddress: string;
    accountPassword: string;
}

export const WalletSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    currency: {
        type: String,
    },

    totalCredit: {
        type: String,
        default: '0x0'
    },
    
    totalUsed: {
        type: String,
        default: '0x0'
    },

    balance: {
        type: String,
        default: '0x0'
    },

    TFCGenerated: {
        type: String
    },

    withdrawBalance: {
        type: String
    },
    
    activateDate: {
        type: Date
    },

    expiryDate: {
        type: Date
    },

    active: {
        type: Boolean,
        default: true
    },

    walletAddress: {
        type: String,
        unique: true,
        sparse: true
    },

    walletPassword: {
        type: String,
    },
    
    accountAddress: {
        type: String,
        unique: true,
        sparse: true
    },

    accountPassword: {
        type: String
    }
}, {
    timestamps: true,
    collection: Wallet.name,
    autoIndex: true,
})

WalletSchema.plugin(mongoose_delete)
WalletSchema.plugin(dataTables)

WalletSchema.index({user: 1, currency: 1}, {
    unique: true
});

WalletSchema.plugin(beautifyUnique, {
    defaultMessage: "Wallet already exist"
});

WalletSchema.index(
    [{ user: 1, currency: 1 }, { unique: true }],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (_err: any, _res: any) => { }
)