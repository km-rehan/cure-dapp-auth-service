import { Module } from '@nestjs/common';
import { ConfigureModule } from "./modules/configure.module";
import { RedisModule } from "nestjs-redis";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthencticationModule } from './modules/authentication.module';


const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "cureDapp";

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379;
const REDIS_CONNECTION_NAME = process.env.REDIS_CONNECTION_NAME || "blaclistedTokens";
const REDIS_CONNECTION = process.env.REDIS_CONNECTION || "blacklisted";

@Module({
  imports: [
    ConfigureModule,
    RedisModule.register({
      name: REDIS_CONNECTION,
      url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
      connectionName: REDIS_CONNECTION_NAME,
      autoResubscribe: true
    }),
    MongooseModule.forRoot(`mongodb://${MONGO_HOST}/${MONGO_DB_NAME}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      autoReconnect: true
    }),
    AuthencticationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
