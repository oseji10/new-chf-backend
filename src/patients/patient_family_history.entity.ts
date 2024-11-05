import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class PatientFamilyHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, (user) => user.userId)
  @JoinColumn()
  user: Users;

  @Column({ nullable: true })
  familySetup: string;

  @Column({ nullable: true })
  familySize: number;

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

  @Column({ unique: true, type: 'decimal' })
  familyMonthlyIncome: number;  // Changed type from string to number for consistency

  @ManyToOne(() => Users, (user) => user.userId, { nullable: true })
  @JoinColumn()
  updatedBy: Users;

  // Timestamp fields

  @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
