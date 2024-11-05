import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';

@Entity('social_conditions')  // Explicitly set the table name for MySQL
export class SocialCondition {
  @PrimaryGeneratedColumn()  // Auto-increment primary key
  id: number;

  @OneToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()  // Foreign key column
  patient: Users;

  @Column({ type: 'varchar', nullable: true })  // Specify type for runningWater
  runningWater: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for typeOfToilet
  typeOfToilet: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for powerSupply
  powerSupply: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for meansOfTransport
  meansOfTransport: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for mobilePhone
  mobilePhone: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for howIsPhoneMaintained
  howIsPhoneMaintained: string;

  @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn({ name: 'updatedBy' })  // Specify column name for clarity
  updatedBy: Users;

  @Column({ type: 'varchar', nullable: true })  // Specify type for isApproved
  isApproved: string;

  @Column({ type: 'text', nullable: true })  // Specify type for comments
  comment: string;

  // Timestamp fields

  @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
