import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Attendance} from "../../../typeorm/entities/Attendance";
import {AttendanceParams} from "../../../utils/types";

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance) private attendanceRepository: Repository<Attendance>
    ) {}

    public async getAttendance(){
        const attendances = this.attendanceRepository.find();
        if (!attendances) {
            throw new NotFoundException('No attendance found');
        }
        return attendances;
    }

    public async createAttendance(AttendanceDetails: AttendanceParams){
        try { 
            const newUser = this.attendanceRepository.create({
                ...AttendanceDetails, 
                createdAt: new Date(),
            });
            return this.attendanceRepository.save(newUser);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
