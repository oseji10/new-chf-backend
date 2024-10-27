import { States } from 'src/states/states.entity';
import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Hospitals {
  @PrimaryGeneratedColumn()
  hospitalId: string;

  @Column({ nullable: true })
  hospitalName: string;

  @Column({ nullable: true })
  hospitalShortName: string;

  @Column({ nullable: true })
  hospitalAddress: string;

  @Column({ nullable: true })
  bankName: string;

  @Column({ nullable: true })
  accountName: string;

  @Column({ nullable: true })
  accountNumber: number;

  @Column({ nullable: true })
  sortCode: string;

  @OneToOne(() => Users, (users) => users.userId)
  @JoinColumn()
  cmd: Users;

  @ManyToOne(() => States, (states) => states.stateId, { nullable: true })
  @JoinColumn()
  state: States;

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
