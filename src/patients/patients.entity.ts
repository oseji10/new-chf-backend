import { States } from '../states/states.entity';
import { Users } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { PatientNextOfKin } from './patient_next_of_kin.entity';
import { Cancers } from '../cancers/cancers.entity';

@Entity()
export class Patients {
  @PrimaryGeneratedColumn()
  chfId: string;

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

  @OneToOne(() => Users, (users) => users.userId)
  @JoinColumn()
  user: Users;

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
 
  @OneToOne(() => Users, (users) => users.userId)
  @JoinColumn()
  primaryPhysician: Users;

  @OneToOne(() => States, (states) => states.stateId)
  @JoinColumn()
  stateOfOrigin: States;

  @OneToOne(() => States, (states) => states.stateId)
  @JoinColumn()
  stateOfResidence: States;

  @OneToOne(() => PatientNextOfKin, (patient_next_of_kin) => patient_next_of_kin.nokId)
  @JoinColumn()
  nextOfKin: States;
  
  
  @Column({nullable: true, enum: ['registering', 'registered', 'primary_physican_reviewed', 'social_welfare_reviewed', 'cmd_reviewed', 'secretariat_reviewed', 'receiving_care'], default: 'registering'})
  applicationStage: string;
  
  @Column({nullable: true, enum: ['active', 'deceased', 'dormant']})
  status: string;

  @OneToOne(() => Cancers, (cancers) => cancers.cancerId)
  @JoinColumn()
  cancer: Cancers;

     // Timestamp fields
     @CreateDateColumn({ type: 'timestamptz' })
     createdAt: Date;
    
     @UpdateDateColumn({ type: 'timestamptz' })
     updatedAt: Date;
    
     @DeleteDateColumn({ type: 'timestamptz', nullable: true })
     deletedAt?: Date;
}
