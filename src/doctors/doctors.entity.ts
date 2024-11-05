import { Users } from '../users/users.entity';
import { Hospitals } from '../hospitals/hospitals.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';

@Entity()
export class Doctors {
    @PrimaryGeneratedColumn()
    doctorId: number;

    @Column({ nullable: false })
    doctorName: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    department: string;

    @Column({ 
        type: 'enum', 
        enum: ['active', 'inactive'], 
        default: 'active' 
    })
    status: 'active' | 'inactive'; // Using union type for better type safety

    @ManyToOne(() => Hospitals, (hospital) => hospital.doctors, { nullable: false })
    @JoinColumn()
    hospital: Hospitals;

    @OneToOne(() => Users, (user) => user.userId, { nullable: true })
    @JoinColumn()
    user?: Users; // Making user optional

    @CreateDateColumn({ type: 'datetime', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', nullable: false })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime', nullable: true })
    deletedAt?: Date;
}
