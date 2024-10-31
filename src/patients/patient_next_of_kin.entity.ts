import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Patients } from './patients.entity';

@Entity()
export class PatientNextOfKin {
  @PrimaryGeneratedColumn()
  nokId: number;

  // @OneToOne(() => Patients, (patients) => patients.nchfId, { nullable: true })
  // @JoinColumn()
  // patient: Users;

  @Column({ nullable: true })
  nextOfKinName: string;

  @Column({ nullable: true })
  nextOfKinPhoneNumber: string;

  @Column({ nullable: true })
  nextOfKinAlternatePhoneNumber: string;

  @Column({ nullable: true })
  relationship: string;

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
