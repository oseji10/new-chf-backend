import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class PatientNextOfKin {
  @PrimaryGeneratedColumn()
  nokId: number;

  @Column({ nullable: true })
  nextOfKinName: string;

  @Column({ nullable: true })
  nextOfKinPhoneNumber: string;

  @Column({ nullable: true })
  nextOfKinAlternatePhoneNumber: string;

  @Column({ nullable: true })
  relationship: string;

  @OneToOne(() => Users, (user) => user.userId, { nullable: true })
  @JoinColumn()
  user: Users;


  @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
