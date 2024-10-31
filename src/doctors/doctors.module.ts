import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctors } from './doctors.entity';
import { PatientCarePlan } from './patient_care_plan.entity';
import { PatientsService } from 'src/patients/patients.service';
import { Patients } from '../patients/patients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctors, PatientCarePlan, Patients])],
  providers: [DoctorsService],
  controllers: [DoctorsController]
})
export class DoctorsModule {}
