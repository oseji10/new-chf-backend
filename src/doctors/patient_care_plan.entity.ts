import { Users } from '../users/users.entity';
import { Hospitals } from '../hospitals/hospitals.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
// import { Patient } from '../patient/patient.entity';

@Entity()
export class PatientCarePlan {
    @PrimaryGeneratedColumn()
    careId: number;

    @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
    @JoinColumn({ name: 'doctorId' }) // Specify column name for clarity
    doctorId: Users;

    @ManyToOne(() => Users, (patients) => patients.userId, { nullable: true })
    @JoinColumn({ name: 'patientId' }) // Specify column name for clarity
    patient: Users;

    @Column()
    careplan: string;

    @Column()
    cost: string;

    @Column({ nullable: true, enum: ['active', 'inactive'], default: 'active' })
    status: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
