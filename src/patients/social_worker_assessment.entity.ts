import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';

@Entity('social_worker_assessments')  // Explicitly set the table name for MySQL
export class SocialWorkerAssessment {
  @PrimaryGeneratedColumn()  // Auto-increment primary key
  id: number;

  @OneToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()  // Foreign key column for patient
  patient: Users;

  @Column({ type: 'varchar', nullable: true })  // Specify type for appearance
  appearance: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for bmi
  bmi: string;

  @Column({ type: 'text', nullable: true })  // Specify type for commentOnHome to allow longer text
  commentOnHome: string;

  @Column({ type: 'text', nullable: true })  // Specify type for commentOnEnvironment to allow longer text
  commentOnEnvironment: string;

  @Column({ type: 'text', nullable: true })  // Specify type for commentOnFamily to allow longer text
  commentOnFamily: string;

  @Column({ type: 'text', nullable: true })  // Specify type for generalComment to allow longer text
  generalComment: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for isApproved
  isApproved: string;

  @Column({ type: 'text', nullable: true })  // Specify type for comment to allow longer text
  comment: string;

  @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn({ name: 'updatedBy' })  // Specify column name for clarity
  updatedBy: Users;


  @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
