import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Res
} from '@nestjs/common'; 
import {RolesService} from "../../services/roles/roles.service";
import {Response} from "express";
import {RoleDto} from "../../dtos/role.dto";
import {UserProfileDto} from "../../../users/dtos/userProfile.dto"; 

@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RolesService) {}

    @Get('/list')
    async getRole(@Res() res: Response){
        try {
            const data = await this.roleService.getRole();
            return res.status(HttpStatus.OK).json({
                message: 'Role fetched successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Post('/create')
    async createRole(@Body() roleDto:RoleDto,@Res() res: Response){
        try {
            const data = await this.roleService.createRole(roleDto);
            return res.status(HttpStatus.OK).json({
                message: 'Role created successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Get('/:id')
    async findUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.roleService.findRole(id);
            return res.status(HttpStatus.OK).json({
                message: 'Role retrieved successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Put('/:id/update')
    async updateRole(
        @Param('id', ParseIntPipe) id: number,
        @Body() roleDto: RoleDto,
        @Res() res: Response
    ) {
        try {
            const data = await this.roleService.updateRole(id, roleDto);
            return res.status(HttpStatus.OK).json({
                message: 'Role updated successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
