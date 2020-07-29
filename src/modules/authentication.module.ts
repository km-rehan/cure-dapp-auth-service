import { Module } from "@nestjs/common";
import { NoSqlModule } from "./no-sql.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationService } from "../services/authentication.service";
import { AuthenticationController } from "src/controllers/authentication.controller";
import { HttpModule } from "@nestjs/common";

const JWT_SECRET = process.env.JWT_SECRET || "temporarySecret"; 

const KYC_BASE_URL = process.env.KYC_BASE_URL || "https://apis.timeswappers.com"

@Module({
    controllers: [AuthenticationController],
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
            baseURL: KYC_BASE_URL
        }),
        NoSqlModule,
        JwtModule.register({
            secret: JWT_SECRET 
        })
    ],
    exports: [AuthenticationService],
    providers: [AuthenticationService]
})
export class AuthencticationModule {}