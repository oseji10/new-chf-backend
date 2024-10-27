import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Hospitals } from './hospitals.entity';

@Entity()
export class HospitalEwallet {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Hospitals, (hospitals) => hospitals.hospitalId)
  @JoinColumn()
  hospital: Hospitals;

  @Column({ unique: true,  type: 'decimal' })
  credit: number;

  @Column({ unique: true,  type: 'decimal' })
  debit: number;


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
