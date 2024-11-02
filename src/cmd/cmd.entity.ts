import { Users } from '../users/users.entity';
import { Hospitals } from '../hospitals/hospitals.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
// import { Patient } from '../patient/patient.entity';

@Entity()
export class Cmds {
    @PrimaryGeneratedColumn()
    cmdId: number;

    @Column()
    cmdName: string;

    @Column()
    title: string;

    @Column()
    department: string;

    @Column({nullable: true, enum: ['active', 'inactive'], default: 'active' })
    status: string;

  

    @ManyToOne(() => Hospitals, (hospital) => hospital.hospitalId)
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
