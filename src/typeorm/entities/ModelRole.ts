import {Column, Entity} from 'typeorm'; 

@Entity({ name: 'model_has_roles' })
export class ModelRole {
    @Column()
    roleId: number;
    
    @Column()
    modelId: number;
}
