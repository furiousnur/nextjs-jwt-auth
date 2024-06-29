import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {CreateUserParams, UserProfileParams} from '../../../utils/types';
import { User } from '../../../typeorm/entities/User';
import { Profile } from '../../../typeorm/entities/Profile';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly authRepository: Repository<User>,
        @InjectRepository(Profile) private readonly userProfileRepository: Repository<Profile>,
    ) {}

    public async getUser(page: number = 1, limit: number = 10) {
        const [users, total] = await this.authRepository.findAndCount({
            relations: ['profile'],
            take: limit,
            skip: (page - 1) * limit,
        });

        if (!users.length) {
            throw new NotFoundException('No user found');
        }
        const totalPages = Math.ceil(total / limit);
        return {
            users,
            total,
            page,
            totalPages,
            limit,
        };
    }

    public async createUser(CreateUserDetails: CreateUserParams){
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(CreateUserDetails.password, salt);
            const user = this.authRepository.create({
                username: CreateUserDetails.username,
                password: hashedPassword,
                createdAt: new Date()
            }); 
            await this.authRepository.save(user); 
            const profile = this.userProfileRepository.create({
                userId: user.id,
                name: CreateUserDetails.name,
                dob: CreateUserDetails.dob,
                position: CreateUserDetails.position,
                department: CreateUserDetails.department,
                profile_pic: CreateUserDetails.profile_pic ?? '',
                createdAt: new Date(),
            }); 
            await this.userProfileRepository.save(profile);
            return profile;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    public async findUser(id: number) {
        const user = await this.authRepository.findOne({
            where: { id },
            relations: ['profile'],
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    public async updateUser(id: number, userDetails: UserProfileParams) {
        const user = await this.authRepository.findOne({ where: { id }, relations: ['profile'] });
        if (!user) {
            throw new NotFoundException('User not found. Check the ID and try again');
        }

        if (user.profile) {
            Object.assign(user.profile, {
                name: userDetails.name,
                dob: userDetails.dob,
                position: userDetails.position,
                department: userDetails.department,
                profile_pic: userDetails.profile_pic,
                updatedAt: new Date(),
            });
            await this.userProfileRepository.save(user.profile);
        } else {
            const profile = this.userProfileRepository.create({
                name: userDetails.name,
                dob: userDetails.dob,
                position: userDetails.position,
                department: userDetails.department,
                profile_pic: userDetails.profile_pic,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            user.profile = profile;
            await this.userProfileRepository.save(profile);
        }

        try {
            return await this.authRepository.save(user);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    public async acceptOrReject(status: string,id: number){
        try {
            const user = await this.authRepository.findOne({ where: { id } });
            if (!user) {
                throw new NotFoundException('User not found');
            }
            const profile = await this.userProfileRepository.findOne({ where: { userId:user.id } });
            return await this.userProfileRepository.save({ 
                ...profile,
                status: status,
                updatedAt: new Date(),
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
