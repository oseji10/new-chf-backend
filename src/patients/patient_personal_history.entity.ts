import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Patients } from './patients.entity';

@Entity()
export class PatientPersonalHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, (user) => user.userId, { nullable: true })
  @JoinColumn()
  user: Users;

  @Column({ unique: true, type: 'decimal' })
  averageMonthlyIncome: number;

  @Column({ nullable: true })
  averageFeedingDaily: number;

  @Column({ nullable: true })
  whoProvidesFeeding: string;

  @Column({ nullable: true })
  accommodation: string; // corrected spelling

  @Column({ nullable: true })
  accommodationType: string; // corrected spelling

  @Column({ nullable: true })
  numberOfGoodSetsOfClothes: number; // pluralized for clarity

  @Column({ nullable: true })
  howAreClothesObtained: string; // improved clarity

  @Column({ nullable: true })
  hospitalReceivingCare: string;

  @Column({ nullable: true })
  reasonForChoosingHospital: string; // improved clarity

  @Column({ nullable: true })
  levelOfSpousalSupport: string;

  @Column({ nullable: true })
  otherSupport: string;

  @ManyToOne(() => Users, (user) => user.userId, { nullable: true })
  @JoinColumn()
  updatedBy: Users;


  @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
