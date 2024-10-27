import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Patients } from './patients.entity';

@Entity()
export class PatientFamilyHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Patients, (patients) => patients.chfId)
  @JoinColumn()
  chfId: Patients;

  @Column({ unique: true })
  familySetup: string;

  @Column({ unique: true })
  familiySize: number;

  @Column({ unique: true })
  birthOrder: string;

  @Column({ unique: true })
  fatherEducationalLevel: string;

  @Column({ unique: true })
  motherEducationalLevel: string;

  @Column({ unique: true })
  fatherOccupation: string;

  @Column({ unique: true })
  motherOccupation: string;

 
  @Column({ unique: true })
  levelOfFamilyCare: number;
  
  @Column({ unique: true,  type: 'decimal' })
  familyMonthlyIncome: string;

 
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
