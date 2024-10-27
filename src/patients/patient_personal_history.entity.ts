import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Patients } from './patients.entity';

@Entity()
export class PatientPersonalHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Patients, (patients) => patients.chfId)
  @JoinColumn()
  chfId: Patients;

  @Column({ unique: true,  type: 'decimal' })
  averageMonthlyIncome: number;

  @Column({ unique: true })
  averageFeedingDaily: number;

  @Column({ unique: true })
  whoProvidesFeeding: string;

  @Column({ unique: true })
  accomodation: string;

  @Column({ unique: true })
  accomodationType: string;

  @Column({ unique: true })
  numberOfGoodSetOfClothes: number;

  @Column({ unique: true })
  howAreClothesGotten: string;

 
  @Column({ unique: true })
  hospitalReceivingCare: number;
  
  @Column({ unique: true })
  whyDidYouChooseHospital: string;

  @Column({ unique: true })
  levelOfSpousalSupport: string;

  @Column({ unique: true })
  otherSupport: string;

 

  @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()
  updatedBy: Users;


     // Timestamp fields
     @CreateDateColumn({ type: 'timestamptz' })
     createdAt: Date;
    
     @UpdateDateColumn({ type: 'timestamptz' })
     updatedAt: Date;
    
     @DeleteDateColumn({ type: 'timestamptz', nullable: true })
     deletedAt?: Date;
}
