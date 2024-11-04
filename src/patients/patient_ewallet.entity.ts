import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Patients } from './patients.entity';

@Entity()
export class PatientEwallet {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, (patients) => patients.userId)
  @JoinColumn({name: 'userId'})
  user: Users;

  @Column({ nullable: true,  type: 'decimal' })
  credit: number;

  @Column({ nullable: true,  type: 'decimal' })
  debit: number;

  @Column({ nullable: true})
  status: string;


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
