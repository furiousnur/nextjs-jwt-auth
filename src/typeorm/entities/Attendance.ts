import { OneToOne, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'; 

@Entity({ name: 'attendances' })
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    attendance_type: string;

    @Column()
    date: string;

    @Column()
    time_in: string;

    @Column()
    time_out: string;

    @Column({ default: 'Pending' })
    status: string;

    @Column({ nullable: true })
    remark: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date; 
}
