import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Patients } from './patients.entity';

@Entity()
export class SocialWorkerAssessment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()
  patient: Users;

  @Column({ nullable: true })
  appearance: string;

  @Column({ nullable: true })
  bmi: string;

  @Column({ nullable: true })
  commentOnHome: string;

  @Column({ nullable: true })
  commentOnEnvironment: string;

  @Column({ nullable: true })
  commentOnFamily: string;

  @Column({ nullable: true })
  generalComment: string;

  
  @Column({nullable: true})
  isApproved: string;


  @Column({nullable: true})
  comment: string;
  
  @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()
  updatedBy: Users;


     // Timestamp fields
     @CreateDateColumn({ type: 'timestamptz' })
     createdAt: Date;
    
     @UpdateDateColumn({ type: 'timestamptz' })
     updatedAt: Date;
    
     @DeleteDateColumn({ type: 'timestamptz', nullable: true })
     deletedAt?: Date;
}
