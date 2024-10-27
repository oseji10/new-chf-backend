import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Patients } from './patients.entity';

@Entity()
export class PatientEwalletTopupRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Patients, (patients) => patients.chfId)
  @JoinColumn()
  chfId: Patients;

  @Column({ nullable: true,  type: 'decimal' })
  amountRequested: number;

  @Column({ nullable: true,  type: 'decimal' })
  amountCredited: number;

  @Column({ nullable: true,  type: 'decimal' })
  debit: number;


  @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()
  requestedBy: Users;

  @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()
  approvedBy: Users;

  @Column({ nullable: true})
  requesterComment: string;


  @Column({ nullable: true})
  approverComment: string;

  @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()
  creditedBy: Users;


     // Timestamp fields
     @CreateDateColumn({ type: 'timestamptz' })
     createdAt: Date;
    
     @UpdateDateColumn({ type: 'timestamptz' })
     updatedAt: Date;
    
     @DeleteDateColumn({ type: 'timestamptz', nullable: true })
     deletedAt?: Date;
}
