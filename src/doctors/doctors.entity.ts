import { Users } from '../users/users.entity';
import { Hospitals } from '../hospitals/hospitals.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
// import { Patient } from '../patient/patient.entity';

@Entity()
export class Doctors {
    @PrimaryGeneratedColumn()
    doctorId: number;

    @Column()
    doctorName: string;

    @Column()
    title: string;

    @Column()
    department: string;

    @Column({nullable: true, enum: ['active', 'inactive'], default: 'active' })
    status: string;

    // @ManyToOne(() => Hospitals, (hospitals) => hospitals.hospitalId, { nullable: true })
    // @JoinColumn()
    // hospital: Hospitals;

    @ManyToOne(() => Hospitals, (hospital) => hospital.doctors)
    @JoinColumn()
  hospital: Hospitals;

    @OneToOne(() => Users, (users) => users.userId, { nullable: true })
    @JoinColumn()
    user: Users;

    // Timestamp fields
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
   
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
   
    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
