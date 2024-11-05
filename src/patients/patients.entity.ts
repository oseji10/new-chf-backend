import { States } from '../states/states.entity';
import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { PatientNextOfKin } from './patient_next_of_kin.entity';
import { Cancers } from '../cancers/cancers.entity';
import { Hospitals } from '../hospitals/hospitals.entity';
import { PatientCarePlan } from '../doctors/patient_care_plan.entity';
import { MdtAssessment } from '../mdt/mdt_assessment.entity';
import { SocialWorkerAssessment } from './social_worker_assessment.entity';
import { SocialCondition } from './social_condition.entity';

@Entity('patients')  // Explicitly set the table name for MySQL
export class Patients {
  @PrimaryGeneratedColumn()  // Auto-increment primary key
  id: number;

  @Column({ type: 'varchar', unique: true })  // Specify type for nchfId
  nchfId: string;

  @Column({ type: 'varchar', unique: true })  // Specify type for nin
  nin: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for hospitalFileNumber
  hospitalFileNumber: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for firstName
  firstName: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for lastName
  lastName: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for otherNames
  otherNames: string;

  @OneToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn({ name: 'userId' })  // Foreign key column for user
  user: Users;

  @Column({ type: 'varchar', nullable: true })  // Specify type for gender
  gender: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for ethnicity
  ethnicity: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for maritalStatus
  maritalStatus: string;

  @Column({ type: 'int', nullable: true })  // Specify type for numberOfChildren
  numberOfChildren: number;

  @Column({ type: 'varchar', nullable: true })  // Specify type for levelOfEducation
  levelOfEducation: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for religion
  religion: string;

  @Column({ type: 'varchar', nullable: true })  // Specify type for occupation
  occupation: string;

  @Column({ type: 'date', nullable: true })  // Specify type for dateOfBirth
  dateOfBirth: string;

  @OneToOne(() => Users, (users) => users.userId, { nullable: true })
  @JoinColumn()
  primaryPhysician: Users;

  @OneToOne(() => States, (states) => states.stateId, { nullable: true })
  @JoinColumn()
  stateOfOrigin: States;

  @OneToOne(() => States, (states) => states.stateId, { nullable: true })
  @JoinColumn()
  stateOfResidence: States;

  @Column({
    type: 'enum',
    enum: ['biodata', 'registered', 'primary_physician_reviewed', 'mdt_reviewed', 'social_worker_reviewed', 'cmd_reviewed', 'secretariat_reviewed', 'receiving_care'],
    default: 'biodata'
  })  // Enum for applicationStage
  applicationStage: string;

  @Column({
    type: 'enum',
    enum: ['active', 'deceased', 'dormant'],
    nullable: true
  })  // Enum for status
  status: string;

  @OneToOne(() => Cancers, (cancers) => cancers.cancerId, { nullable: true })
  @JoinColumn()
  cancer: Cancers;

  @Column({ type: 'varchar', nullable: true })  // Specify type for cancerStage
  cancerStage: string;

  // Timestamp fields

  @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Hospitals, (hospitals) => hospitals.hospitalId, { nullable: true })
  @JoinColumn()
  hospital: Hospitals;

  @Column({ type: 'varchar', nullable: true })  // Specify type for profileCompletionPercentage
  profileCompletionPercentage: string;

  @Column({ type: 'enum', enum: ['yes', 'no'], default: 'no' })  // Enum for isPrimaryPhysicianReviewed
  isPrimaryPhysicianReviewed: string;

  @Column({ type: 'enum', enum: ['yes', 'no'], default: 'no' })  // Enum for isSocialWorkerReviewed
  isSocialWorkerReviewed: string;

  @Column({ type: 'enum', enum: ['yes', 'no'], default: 'no' })  // Enum for isMdtReviewed
  isMdtReviewed: string;

  @Column({ type: 'enum', enum: ['yes', 'no'], default: 'no' })  // Enum for isCmdReviewed
  isCmdReviewed: string;

  @Column({ type: 'enum', enum: ['yes', 'no'], default: 'no' })  // Enum for isSecretariatReviewed
  isSecretariatReviewed: string;

  @OneToOne(() => PatientCarePlan, (carePlan) => carePlan.patient)
  carePlans: PatientCarePlan;

  @OneToOne(() => MdtAssessment, (mdtAssessment) => mdtAssessment.patient)
  mdtAssessment: MdtAssessment;

  @OneToOne(() => SocialWorkerAssessment, (socialWorkerAssessment) => socialWorkerAssessment.patient)
  socialWorkerAssessment: SocialWorkerAssessment;

  @OneToOne(() => SocialCondition, (socialCondition) => socialCondition.patient)
  socialCondition: SocialCondition;
}
