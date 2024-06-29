import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post, Put,
    Res,
    UseGuards
} from '@nestjs/common';
import {AttendanceService} from "../../services/attendance/attendance.service";
import {Response} from "express";
import {AttendanceDto} from "../../dtos/attendance.dto";
import {JwtAuthGuards} from "../../../auth/guards/jwt.guards";
import {RoleDto} from "../../../roles/dtos/role.dto";

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

    @Get('/:id')
    async findRole(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.attendanceService.findAttendance(id);
            return res.status(HttpStatus.OK).json({
                message: 'Attendance retrieved successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Put('/:id/update')
    async updateAttendance(
        @Param('id', ParseIntPipe) id: number,
        @Body() roleDto: AttendanceDto,
        @Res() res: Response
    ) {
        try {
            const data = await this.attendanceService.updateAttendance(id, roleDto);
            return res.status(HttpStatus.OK).json({
                message: 'Attendance updated successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Delete('/:id/delete')
    async deleteAttendance(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            await this.attendanceService.deleteAttendance(id);
            return res.status(HttpStatus.OK).json({
                message: 'Attendance deleted successfully',
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
