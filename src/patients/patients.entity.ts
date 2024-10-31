import { States } from '../states/states.entity';
import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { PatientNextOfKin } from './patient_next_of_kin.entity';
import { Cancers } from '../cancers/cancers.entity';
import { Hospitals } from '../hospitals/hospitals.entity';

@Entity()
export class Patients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nchfId: string;

  @Column({ unique: true })
  nin: string;

  @Column({nullable: true,})
  hospitalFileNumber: string;

  @Column({nullable: true,})
  firstName: string;

  @Column({nullable: true,})
  lastName: string;

  @Column({nullable: true,})
  otherNames: string;

  @OneToOne(() => Users, (users) => users.userId, {nullable: true,})
  @JoinColumn({ name: 'userId' }) 
  user: Users;

  // @Column({nullable: true})
  // userId: number;

  @Column({nullable: true,})
  gender: string;

  @Column({nullable: true,})
  ethnicity: string;

  @Column({nullable: true,})
  maritalStatus: string;

  @Column({nullable: true,})
  numberOfChildren: string;

  @Column({nullable: true,})
  levelOfEducation: string;

  @Column({nullable: true,})
  religion: string;

  @Column({nullable: true,})
  occupation: string;

  @Column({nullable: true,})
  dateOfBirth: string;
 
  @OneToOne(() => Users, (users) => users.userId, {nullable: true,})
  @JoinColumn()
  primaryPhysician: Users;

  @OneToOne(() => States, (states) => states.stateId, {nullable: true,})
  @JoinColumn()
  stateOfOrigin: States;

  @OneToOne(() => States, (states) => states.stateId, {nullable: true,})
  @JoinColumn()
  stateOfResidence: States;

  // @OneToOne(() => PatientNextOfKin, (patient_next_of_kin) => patient_next_of_kin.nokId, { nullable: true })
  // @JoinColumn()
  // nextOfKin: PatientNextOfKin;
  
  
  @Column({nullable: true, enum: ['biodata', 'registered', 'primary_physican_reviewed', 'social_welfare_reviewed', 'cmd_reviewed', 'secretariat_reviewed', 'receiving_care'], default: 'biodata'})
  applicationStage: string;
  
  @Column({nullable: true, enum: ['active', 'deceased', 'dormant']})
  status: string;

  @OneToOne(() => Cancers, (cancers) => cancers.cancerId, {nullable: true,})
  @JoinColumn()
  cancer: Cancers;

  @Column({nullable: true,})
  cancerStage: string;

     // Timestamp fields
     @CreateDateColumn({ type: 'timestamptz' })
     createdAt: Date;
    
     @UpdateDateColumn({ type: 'timestamptz' })
     updatedAt: Date;
    
     @DeleteDateColumn({ type: 'timestamptz', nullable: true })
     deletedAt?: Date;


     @ManyToOne(() => Hospitals, (hospitals) => hospitals.hospitalId, { nullable: true })
  @JoinColumn()
  hospital: Hospitals;

  @Column({nullable: true,})
  profileCompletionPercentage: string;

  @Column({nullable: true, enum: ['yes', 'no'], default: 'no'})
  isPrimaryPhysicianReviewed: string;


  @Column({nullable: true, enum: ['yes', 'no'], default: 'no'})
  isSocialWelfareReviewed: string;


  @Column({nullable: true, enum: ['yes', 'no'], default: 'no'})
  isMdtReviewed: string;


  @Column({nullable: true, enum: ['yes', 'no'], default: 'no'})
  isCmdReviewed: string;

  @Column({nullable: true, enum: ['yes', 'no'], default: 'no'})
  isSecretariatReviewed: string;
}
