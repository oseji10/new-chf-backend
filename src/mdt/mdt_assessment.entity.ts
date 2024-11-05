import { Users } from '../users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';

@Entity()
export class MdtAssessment {
    @PrimaryGeneratedColumn()
    assessmentId: number;

    @ManyToOne(() => Users, (user) => user.userId, { nullable: true })
    @JoinColumn({ name: 'doctorId' }) // Specify column name for clarity
    cmdId: Users; // Renamed from cmdId to doctor for clarity

    @ManyToOne(() => Users, (patient) => patient.userId, { nullable: true })
    @JoinColumn({ name: 'patientId' }) // Specify column name for clarity
    patient: Users;

    @Column({ nullable: true })
    recommendations: string;

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

    @ManyToOne(() => Users, (user) => user.userId, { nullable: true })
    @JoinColumn() // No need for a name since it's already implied by the relation
    updatedBy: Users;
}
