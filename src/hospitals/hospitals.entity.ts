import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Hospitals {
  @PrimaryGeneratedColumn()
  hospitalId: string;

  @Column({ unique: true })
  hospitalName: string;

  @Column({ unique: true })
  hospitalShortName: string;

  @Column({ unique: true })
  hospitalAddress: string;

  @Column({ unique: true })
  bankName: string;

  @Column({ unique: true })
  accountName: string;

  @Column({ unique: true })
  accountNumber: number;

  @Column({ unique: true })
  sortCode: string;

  @OneToOne(() => Users, (users) => users.userId)
  @JoinColumn()
  cmd: Users;

  @OneToOne(() => Users, (users) => users.userId)
  @JoinColumn()
  hospitalAdmin: Users;
  
   // Timestamp fields
   @CreateDateColumn({ type: 'timestamptz' })
   createdAt: Date;
  
   @UpdateDateColumn({ type: 'timestamptz' })
   updatedAt: Date;
  
   @DeleteDateColumn({ type: 'timestamptz', nullable: true })
   deletedAt?: Date;
}
