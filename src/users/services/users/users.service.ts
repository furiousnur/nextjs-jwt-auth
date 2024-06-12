import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfileParams } from '../../../utils/types';
import { User } from '../../../typeorm/entities/User';
import { Profile } from '../../../typeorm/entities/Profile';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly authRepository: Repository<User>,
        @InjectRepository(Profile) private readonly userProfileRepository: Repository<Profile>,
    ) {}

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
}