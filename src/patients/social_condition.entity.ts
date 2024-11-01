import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Patients } from './patients.entity';

@Entity()
export class SocialCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()
  patient: Users;

  @Column({ nullable: true })
  runningWater: string;

  @Column({ nullable: true })
  typeOfToilet: string;

  @Column({ nullable: true })
  powerSupply: string;

  @Column({ nullable: true })
  meansOfTransport: string;

  @Column({ nullable: true })
  mobilePhone: string;

  @Column({ nullable: true })
  howIsPhoneMaintained: string;

  
  @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()
  updatedBy: Users;

  @Column({nullable: true})
  isApproved: string;


  @Column({nullable: true})
  comment: string;


     // Timestamp fields
     @CreateDateColumn({ type: 'timestamptz' })
     createdAt: Date;
    
     @UpdateDateColumn({ type: 'timestamptz' })
     updatedAt: Date;
    
     @DeleteDateColumn({ type: 'timestamptz', nullable: true })
     deletedAt?: Date;
}
