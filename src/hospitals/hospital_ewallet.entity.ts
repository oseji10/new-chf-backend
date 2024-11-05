import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Hospitals } from './hospitals.entity';

@Entity()
export class HospitalEwallet {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Hospitals, (hospitals) => hospitals.hospitalId, { eager: true })
  @JoinColumn()
  hospital: Hospitals;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 }) // Added precision and default value
  credit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 }) // Added precision and default value
  debit: number;

  @ManyToOne(() => Users, (users) => users.userId, { nullable: true, eager: true }) // Added eager loading
  @JoinColumn()
  processedBy: Users;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
