import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class PatientEwallet {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column({ nullable: true, type: 'decimal' })
  credit: number;

  @Column({ nullable: true, type: 'decimal' })
  debit: number;

  @Column({ nullable: true })
  status: string;

  @ManyToOne(() => Users, (user) => user.userId, { nullable: true })
  @JoinColumn()
  processedBy: Users;

  // Timestamp fields
  
  @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
