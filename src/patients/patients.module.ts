import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patients } from './patients.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEwallet } from './patient_ewallet.entity';
import { PatientEwalletTopupRequest } from './patient_ewallet_topup.entity';
import { PatientNextOfKin } from './patient_next_of_kin.entity';
import { PatientFamilyHistory } from './patient_family_history.entity';
import { PatientPersonalHistory } from './patient_personal_history.entity';
import { PatientCarePlan } from '../doctors/patient_care_plan.entity';
import { SocialWorkerAssessment } from './social_worker_assessment.entity';
import { SocialCondition } from './social_condition.entity';
import { Users } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patients, 
    PatientEwallet, 
    PatientEwalletTopupRequest, 
    PatientNextOfKin, 
    PatientFamilyHistory, 
    PatientPersonalHistory, 
    PatientCarePlan, 
    SocialWorkerAssessment, 
    SocialCondition,
    Users
  ])],
  providers: [PatientsService],
  controllers: [PatientsController],
  exports: [PatientsService], // Export PatientsService here
})
export class PatientsModule {}
