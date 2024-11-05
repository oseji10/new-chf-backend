import { Users } from '../users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';

@Entity()
export class PatientCarePlan {
    @PrimaryGeneratedColumn()
    careId: number;

    @ManyToOne(() => Users, (user) => user.userId, { nullable: true })
    @JoinColumn({ name: 'doctorId' }) // Specify column name for clarity
    doctorId: Users; // Renamed to doctor for clarity

    @ManyToOne(() => Users, (patient) => patient.userId, { nullable: true })
    @JoinColumn({ name: 'patientId' }) // Specify column name for clarity
    patient: Users;

    @Column({ nullable: false }) // Made carePlan non-nullable for data integrity
    carePlan: string; // Use camel case for consistency

    @Column({ nullable: false }) // Made cost non-nullable for data integrity
    cost: string;

    @Column({ 
        type: 'enum', 
        enum: ['active', 'inactive'], 
        default: 'active', 
        nullable: true 
    })
    status: 'active' | 'inactive'; // Use union type for better type safety

    @Column({ nullable: true })
    isApproved: string; // Consider changing to boolean if it's a yes/no field

    @Column({ nullable: true })
    comment: string;

    @CreateDateColumn({ type: 'datetime', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', nullable: false })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime', nullable: true })
    deletedAt?: Date;
}
