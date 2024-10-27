import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Patients } from './patients.entity';

@Entity()
export class PatientNextOfKin {
  @PrimaryGeneratedColumn()
  nokId: number;

  @OneToOne(() => Patients, (patients) => patients.chfId)
  @JoinColumn()
  chfId: Patients;

  @Column({ unique: true })
  nextOfKinName: string;

  @Column({ unique: true })
  nextOfKinPhoneNumber: string;

  @Column({ unique: true })
  nextOfKinAlternatePhoneNumber: string;

  @Column({ unique: true })
  relationship: string;

  @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()
  processedBy: Users;


     // Timestamp fields
     @CreateDateColumn({ type: 'timestamptz' })
     createdAt: Date;
    
     @UpdateDateColumn({ type: 'timestamptz' })
     updatedAt: Date;
    
     @DeleteDateColumn({ type: 'timestamptz', nullable: true })
     deletedAt?: Date;
}
