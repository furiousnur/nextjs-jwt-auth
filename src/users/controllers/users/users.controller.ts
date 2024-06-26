import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Put,
    Res,
    UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../../services/users/users.service';
import { UserProfileDto } from '../../dtos/userProfile.dto';
import { JwtAuthGuards } from '../../../auth/guards/jwt.guards';

@Controller('users')
@UseGuards(JwtAuthGuards)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/list')
    async getLeave(@Res() res: Response){
        try {
            const data = await this.usersService.getUser();
            return res.status(HttpStatus.OK).json({
                message: 'User fetched successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Get('/:id/profile')
    async findUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.usersService.findUser(id);
            return res.status(HttpStatus.OK).json({
                message: 'User profile retrieved successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Put('/:id/profile/update')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() userProfileDto: UserProfileDto,
        @Res() res: Response
    ) {
        try {
            const data = await this.usersService.updateUser(id, userProfileDto);
            return res.status(HttpStatus.OK).json({
                message: 'User profile updated successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
