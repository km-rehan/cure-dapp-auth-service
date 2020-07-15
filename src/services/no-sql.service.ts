import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Wallet } from "../models/wallet.model";
import { User } from "src/models/user.model";
import { Profile } from "src/models/profile.model";



@Injectable()
export class NoSqlService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
        @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
    ) {

    }

    public getUserModel(): Model<User> {
        return this.userModel;
    }

    public getProfileModel(): Model<Profile> {
        return this.profileModel;
    }

    public getWalletModel(): Model<Wallet> {
        return this.walletModel;
    }
}