import { Module } from '@nestjs/common';
import { SecretariatsService } from './secretariat.service';
import { SecretariatsController } from './secretariat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Secretariats } from './secretariat.entity';

import { PatientsService } from 'src/patients/patients.service';
import { Patients } from '../patients/patients.entity';
import { SecretariatAssessment } from './secretariat_assessment.entity';
import { PatientsModule } from '../patients/patients.module';
import { PatientEwallet } from '../patients/patient_ewallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Secretariats, Patients, SecretariatAssessment, PatientEwallet]),
PatientsModule
],
  providers: [SecretariatsService],
  controllers: [SecretariatsController]
})
export class SecretariatsModule {}
