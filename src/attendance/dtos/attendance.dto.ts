import { IsNotEmpty, IsString } from 'class-validator';

export class AttendanceDto {
    @IsNotEmpty()
    @IsString()
    userId: number;
 
    @IsNotEmpty()
    @IsString()
    attendance_type: string;

    @IsNotEmpty()
    @IsString()
    date: string;

    @IsNotEmpty()
    @IsString()
    time_in: string;

    @IsString()
    time_out?: string;

    @IsString()
    remark?: string;
}
