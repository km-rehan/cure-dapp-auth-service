import { Module } from "@nestjs/common";
import { NoSqlModule } from "./no-sql.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationService } from "../services/authentication.service";
import { AuthenticationController } from "src/controllers/authentication.controller";

const JWT_SECRET = process.env.JWT_SECRET || "temporarySecret"; 

@Module({
    controllers: [AuthenticationController],
    imports: [
        NoSqlModule,
        JwtModule.register({
            secret: JWT_SECRET 
        })
    ],
    exports: [AuthenticationService],
    providers: [AuthenticationService]
})
export class AuthencticationModule {}