import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "../../../typeorm/entities/Role";
import {Repository} from "typeorm";
import {RoleParams} from "../../../utils/types";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ) {}

    public async getRole(){
        const roles = this.roleRepository.find();
        if (!roles) {
            throw new NotFoundException('No attendance found');
        }
        return roles;
    }

    public async createRole(RoleDetails: RoleParams){
        try {
            const newRole = this.roleRepository.create({
                ...RoleDetails,
                createdAt: new Date(),
            });
            return this.roleRepository.save(newRole);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
    
    public async findRole(id: number){
        const role = await this.roleRepository.findOne({
            where: { id }
        });
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return role;
    }
    
    public async updateRole(id: number, RoleDetails: RoleParams){
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException('Role not found. Check the ID and try again');
        }

        Object.assign(role, {
            ...RoleDetails,
            updatedAt: new Date(),
        });
        return this.roleRepository.save(role);
    }

    public async deleteRole(id: number){ 
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException('Role not found. Check the ID and try again');
        }
        return this.roleRepository.remove(role);
    }
}
