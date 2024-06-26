import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'; 

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    name: string; 
    
    @Column({ default: 'web' })
    guard_name: string; 

    @Column({ default: 'Inactive' })
    status: string; 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date; 
}
