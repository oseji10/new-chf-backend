import { Users } from '../users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';

@Entity('secretariat_assessments')  // Explicitly set the table name for MySQL
export class SecretariatAssessment {
    @PrimaryGeneratedColumn()  // Auto-increment primary key
    assesmentId: number;

    @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
    @JoinColumn({ name: 'secretariatId' })  // Specify column name for clarity
    secretariatId: Users;

    @ManyToOne(() => Users, (patients) => patients.userId, { nullable: true })
    @JoinColumn({ name: 'userId' })  // Specify column name for clarity
    patient: Users;

    @Column({ type: 'varchar', nullable: true })  // Specify type for recommendations
    recommendations: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })  // Specify type for cost as a decimal
    cost: string;

    @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active', nullable: true })  // Use enum type for status
    status: string;

    @Column({ type: 'varchar', nullable: true })  // Specify type for isApproved
    isApproved: string;

    @Column({ type: 'text', nullable: true })  // Specify type for comments
    comment: string;

   
  @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;

    @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
    @JoinColumn({ name: 'updatedBy' })  // Specify column name for clarity
    updatedBy: Users;
}
