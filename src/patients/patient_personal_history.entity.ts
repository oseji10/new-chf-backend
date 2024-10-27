import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Patients } from './patients.entity';

@Entity()
export class PatientPersonalHistory {
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToOne(() => Patients, (patients) => patients.chfId)
  // @JoinColumn()
  // chfId: Patients;

  @OneToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()
  user: Users;

  @Column({ unique: true,  type: 'decimal' })
  averageMonthlyIncome: number;

  @Column({ nullable: true })
  averageFeedingDaily: number;

  @Column({ nullable: true })
  whoProvidesFeeding: string;

  @Column({ nullable: true })
  accomodation: string;

  @Column({ nullable: true })
  accomodationType: string;

  @Column({ nullable: true })
  numberOfGoodSetOfClothes: number;

  @Column({ nullable: true })
  howAreClothesGotten: string;

 
  @Column({ nullable: true })
  hospitalReceivingCare: string;
  
  @Column({ nullable: true })
  whyDidYouChooseHospital: string;

  @Column({ nullable: true })
  levelOfSpousalSupport: string;

  @Column({ nullable: true })
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
