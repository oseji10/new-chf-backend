import { Module } from '@nestjs/common';
import { SocialWorkersService } from './social_worker.service';
import { SocialWorkersController } from './social_worker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialWorkers } from './social_worker.entity';

import { PatientsService } from 'src/patients/patients.service';
import { Patients } from '../patients/patients.entity';
import { SocialWorkerAssessment } from '../patients/social_worker_assessment.entity';
import { SocialCondition } from '../patients/social_condition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialWorkers, Patients, SocialWorkerAssessment, SocialCondition])],
  providers: [SocialWorkersService],
  controllers: [SocialWorkersController]
})
export class SocialWorkersModule {}
