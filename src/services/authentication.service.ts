import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "../models/user.model";
import { Model } from "mongoose";
import { NoSqlService } from "./no-sql.service";
import { VerifyMessageDto } from "../dtos/verify-message.dto";
import { JwtService } from "@nestjs/jwt";
import { Wallet } from "src/models/wallet.model";
import * as ethers from "ethers";
import { UpdateProfileDto } from "src/dtos/update-profile.dto";

@Injectable()
export class AuthenticationService {

    constructor(
        private readonly noSqlService: NoSqlService,
        private readonly jwtService: JwtService
    ) {
    }

    public async verifyMessage(verifyMessageDto: VerifyMessageDto): Promise<any> {
        try {
            const newWalletAddress = await ethers.utils.verifyMessage(verifyMessageDto.tokenId, verifyMessageDto.signature);
            if (verifyMessageDto.walletAddress !== newWalletAddress) {
                throw new HttpException("Invalid wallet address", HttpStatus.UNAUTHORIZED);
            }
            const walletAddress = newWalletAddress.toLowerCase();
            const userModel: Model<User> = this.noSqlService.getUserModel();
            const walletModel: Model<Wallet> = this.noSqlService.getWalletModel();
            const user: User = await userModel.findOne({ walletAddress: walletAddress });
            if (!user) {
                const newUser = {
                    walletAddress: walletAddress
                }

                const newlyCreatedUser = await new userModel(newUser).save();
                const newWallet = {
                    user: newlyCreatedUser._id,
                    walletAddress: newlyCreatedUser.walletAddress,
                    currency: 'ES'
                }

                const newlyCreatedWallet = await new walletModel(newWallet).save()

                const updatedUser = await userModel.findByIdAndUpdate(
                    newlyCreatedUser._id,
                    { $push: { wallets: newlyCreatedWallet._id }, isUserVerified: false }, // <-- this needs to be changed when implemented
                    { new: true, useFindAndModify: false }
                )

                const token = await this.jwtService.signAsync({
                    walletAddress: updatedUser.walletAddress,
                    _id: updatedUser._id
                }, { expiresIn: 180 * 86400 * 30 });

                return {
                    status: "success",
                    messsage: "Login successful",
                    body: updatedUser,
                    token: token
                }
            }

            const updatedUser = await userModel.findByIdAndUpdate(
                user._id,
                {isUserVerified: true }, // <-- this needs to be changed when implemented
                { new: true, useFindAndModify: false }
            )

            const token = await this.jwtService.signAsync(
                {
                    walletAddress: updatedUser.walletAddress,
                    _id: user._id
                },
                { expiresIn: 180 * 86400 * 30 }
            )

            return {
                status: "success",
                messsage: "Login successful",
                body: updatedUser,
                token: token
            }

        } catch (exception) {
            throw exception;
        }
    }

    public async verifyToken(token: string): Promise<any> {
        try {
            const user = this.jwtService.verifyAsync(token, {
                complete: true
            })
            return user;
        } catch (exception) {
            throw exception;
        }
    }

    public async updateProfileService(updatProfileDto: UpdateProfileDto): Promise<any> {
        try {
            const userModel = this.noSqlService.getUserModel();
            const profileModel = this.noSqlService.getProfileModel();
            const user = await userModel.findById(updatProfileDto.userId);
            if (!user) throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
            const profile = await profileModel.findOne({
                userId: updatProfileDto.userId
            });
            if (profile) {
                const updatedProfile = profileModel.findByIdAndUpdate(
                    profile._id,
                    updatProfileDto,
                    {new: true, useFindAndModify: false}
                )
                
                return {
                    status: HttpStatus.OK,
                    message: "Profile updated successfully",
                }
            }

            const createdProfile = await new profileModel(updatProfileDto).save()
            if (!createdProfile) throw new HttpException("Update profile failed", HttpStatus.CONFLICT);
            const updatedUser = await userModel.findByIdAndUpdate(
                createdProfile.userId,
                { profileId: createdProfile._id },
                { new: true, useFindAndModify: false }
            )
            if (!updatedUser) throw new HttpException("Update user failed", HttpStatus.CONFLICT);
            return {
                status: HttpStatus.OK,
                message: "Profile updated successfully",
            }
        } catch (exception) {
            throw exception;
        }
    }

}