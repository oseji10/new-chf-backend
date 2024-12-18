import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Patients } from './patients.entity';

@Entity()
export class PatientEwalletTopupRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Patients, (patient) => patient.nchfId)
  @JoinColumn()
  chfId: Patients;

  @Column({ nullable: true, type: 'decimal' })
  amountRequested: number;

  @Column({ nullable: true, type: 'decimal' })
  amountCredited: number;

  @Column({ nullable: true, type: 'decimal' })
  debit: number;

  @ManyToOne(() => Users, (user) => user.userId, { nullable: true })
  @JoinColumn()
  requestedBy: Users;

  @ManyToOne(() => Users, (user) => user.userId, { nullable: true })
  @JoinColumn()
  approvedBy: Users;

  @Column({ nullable: true })
  requesterComment: string;

  @Column({ nullable: true })
  approverComment: string;

  @ManyToOne(() => Users, (user) => user.userId, { nullable: true })
  @JoinColumn()
  creditedBy: Users;

  // Timestamp fields

  @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
