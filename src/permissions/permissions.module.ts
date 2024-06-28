import { Module } from '@nestjs/common';
import {PermissionsController} from "./controllers/permissions/permissions.controller";
import {PermissionsService} from "./services/permissions/permissions.service";
import {AuthModule} from "../auth/auth.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm"; 
import {Permission} from "../typeorm/entities/Permission";

@Module({
  imports: [
    AuthModule,
    PassportModule,
    JwtModule,
    TypeOrmModule.forFeature([Permission]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService]
})
export class PermissionsModule {}
