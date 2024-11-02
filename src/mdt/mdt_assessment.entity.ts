import { Users } from '../users/users.entity';
import { Hospitals } from '../hospitals/hospitals.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
// import { Patient } from '../patient/patient.entity';

@Entity()
export class MdtAssessment {
    @PrimaryGeneratedColumn()
    assesmentId: number;

    @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
    @JoinColumn({ name: 'doctorId' }) // Specify column name for clarity
    cmdId: Users;

    @ManyToOne(() => Users, (patients) => patients.userId, { nullable: true })
    @JoinColumn({ name: 'patientId' }) // Specify column name for clarity
    patient: Users;

    @Column({nullable: true})
    recommendations: string;

    @Column()
    cost: string;

    @Column({ nullable: true, enum: ['active', 'inactive'], default: 'active' })
    status: string;

    @Column({nullable: true})
    isApproved: string;

    @Column({nullable: true})
    comment: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()
  updatedBy: Users;
}
