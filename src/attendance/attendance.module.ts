import { Module } from '@nestjs/common';
import { AttendanceService } from './services/attendance/attendance.service';
import { AttendanceController } from './controllers/attendance/attendance.controller';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {TypeOrmModule} from "@nestjs/typeorm"; 
import {Attendance} from "../typeorm/entities/Attendance";

@Module({
    imports: [
        AuthModule, 
        PassportModule,
        JwtModule,
        TypeOrmModule.forFeature([Attendance]),
    ],
    controllers: [AttendanceController],
    providers: [AttendanceService],
})
export class AttendanceModule {}
