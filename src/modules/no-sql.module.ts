import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../models/user.model";
import { Profile, ProfileSchema } from "../models/profile.model";
import { Wallet, WalletSchema } from "src/models/wallet.model";
import { NoSqlService } from "../services/no-sql.service";


@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: User.name,
                    schema: UserSchema
                },

                {
                    name: Profile.name,
                    schema: ProfileSchema
                },

                {
                    name: Wallet.name,
                    schema: WalletSchema,
                    
                }
            ],
        )
    ],

    providers: [NoSqlService],
    exports: [NoSqlService]
})
export class NoSqlModule {}