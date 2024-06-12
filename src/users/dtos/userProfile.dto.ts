import { IsNotEmpty, IsString } from 'class-validator';

export class UserProfileDto {
    @IsNotEmpty()
    @IsString()
    userId: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    dob: string;

    @IsNotEmpty()
    @IsString()
    position: string;
    
    @IsNotEmpty()
    @IsString()
    department: string;
    
    @IsNotEmpty()
    @IsString()
    status: string;

    @IsString()
    profile_pic?: string;
}
