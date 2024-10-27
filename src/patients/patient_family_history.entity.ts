import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Patients } from './patients.entity';

@Entity()
export class PatientFamilyHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, (users) => users.userId)
  @JoinColumn()
  user: Users;

  @Column({ nullable: true })
  familySetup: string;

  @Column({ nullable: true })
  familiySize: number;

  @Column({ nullable: true })
  birthOrder: string;

  @Column({ nullable: true })
  fatherEducationalLevel: string;

  @Column({ nullable: true })
  motherEducationalLevel: string;

  @Column({ nullable: true })
  fatherOccupation: string;

  @Column({ nullable: true })
  motherOccupation: string;

 
  @Column({ nullable: true })
  levelOfFamilyCare: string;
  
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
