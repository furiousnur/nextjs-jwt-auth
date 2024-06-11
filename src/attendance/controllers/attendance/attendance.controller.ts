import {BadRequestException, Body, Controller, Get, HttpStatus, Post, Res, UseGuards} from '@nestjs/common';
import {AttendanceService} from "../../services/attendance/attendance.service";
import {Response} from "express";
import {AttendanceDto} from "../../dtos/attendance.dto";
import {JwtAuthGuards} from "../../../auth/guards/jwt.guards";

@Controller('attendance')
@UseGuards(JwtAuthGuards)
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) {}
    
    @Get('/list')
    async getAttendance(@Res() res: Response){
        try {
            const data = await this.attendanceService.getAttendance();
            return res.status(HttpStatus.OK).json({
                message: 'Attendance fetched successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Post('/create')
    async createUser(@Body() attendanceDto:AttendanceDto,@Res() res: Response){
        try {
            const data = await this.attendanceService.createAttendance(attendanceDto);
            return res.status(HttpStatus.OK).json({
                message: 'Attendance created successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
