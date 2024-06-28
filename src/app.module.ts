import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./typeorm/entities/User";
import { AttendanceModule } from './attendance/attendance.module';
import {Attendance} from "./typeorm/entities/Attendance";
import { UsersModule } from './users/users.module';
import {Profile} from "./typeorm/entities/Profile";
import { LeavesModule } from './leaves/leaves.module';
import {Leave} from "./typeorm/entities/Leave";
import { RolesModule } from './roles/roles.module';
import {Role} from "./typeorm/entities/Role";
import {PermissionsModule} from "./permissions/permissions.module";
import {Permission} from "./typeorm/entities/Permission";
import {RolePermission} from "./typeorm/entities/RolePermission";

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    port:3306,
    host:'localhost',
    username:'root',
    password:'',
    database:'nestjs_jwt',
    entities:[User, Attendance, Profile, Leave, Role, Permission, RolePermission],
    synchronize:true
  }),AuthModule, AttendanceModule, UsersModule, LeavesModule, RolesModule, PermissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
