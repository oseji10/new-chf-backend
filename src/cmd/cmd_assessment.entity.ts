import { Users } from '../users/users.entity';
import { Hospitals } from '../hospitals/hospitals.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, OneToMany, JoinColumn, Unique } from 'typeorm';
// import { Patient } from '../patient/patient.entity';

@Entity()
// @Unique(["patient"])
export class CmdAssessment {
    @PrimaryGeneratedColumn()
    assesmentId: number;

    @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
    @JoinColumn({ name: 'cmdId' }) // Specify column name for clarity
    cmdId: Users;

    @ManyToOne(() => Users, (patients) => patients.userId, )
    @JoinColumn({ name: 'patient' }) // Specify column name for clarity
    patient: Users;

    @Column({nullable: true})
    recommendations: string;

    @Column({nullable: true})
    cost: string;

    @Column({ 
      type: 'enum', 
      enum: ['active', 'inactive'], 
      default: 'active' 
  })
  status: 'active' | 'inactive'; // Using union type for better type safety


    @Column({nullable: true})
    isApproved: string;

    @Column({nullable: true})
    comment: string;

   
  @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;

    @ManyToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()
  updatedBy: Users;
}
