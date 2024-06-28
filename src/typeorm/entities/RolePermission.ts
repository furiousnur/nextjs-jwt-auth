import {Entity, ManyToOne, PrimaryColumn} from 'typeorm';
import {Role} from "./Role";

@Entity({ name: 'role_has_permissions' })
export class RolePermission {
    @PrimaryColumn()
    permissionId: number;

    @PrimaryColumn()
    roleId: number;

    @ManyToOne(() => Role, role => role.permissions)
    role: Role;
}
