import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Attendance} from "../../../typeorm/entities/Attendance";
import {AttendanceParams, RoleParams} from "../../../utils/types";

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

    public async findAttendance(id: number){
        const role = await this.attendanceRepository.findOne({
            where: { id }
        });
        if (!role) {
            throw new NotFoundException('Attendance not found');
        }
        return role;
    }

    public async updateAttendance(id: number, AttendanceDetails: AttendanceParams) {
        const attendance = await this.attendanceRepository.findOne({ where: { id } });
        if (!attendance) {
            throw new NotFoundException('Attendance not found. Check the ID and try again');
        } 
        Object.assign(attendance, {
            ...AttendanceDetails,
            status: 'Pending',
            updatedAt: new Date(),
        }); 
        await this.attendanceRepository.save(attendance);
        return attendance;
    }
    
    public async deleteAttendance(id: number){
        const role = await this.attendanceRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException('Attendance not found. Check the ID and try again');
        } 
        return this.attendanceRepository.remove(role);
    }

    public async acceptOrReject(status: string,id: number){
        try {
            const attendance = await this.attendanceRepository.findOne({ where: { id } });
            if (!attendance) {
                throw new NotFoundException('Attendance not found');
            }
            return await this.attendanceRepository.save({
                ...attendance,
                status: status,
                updatedAt: new Date(),
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
