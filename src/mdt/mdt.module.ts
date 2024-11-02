import { Module } from '@nestjs/common';
import { MdtsService } from './mdt.service';
import { MdtsController } from './mdt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mdts } from './mdt.entity';

import { PatientsService } from 'src/patients/patients.service';
import { Patients } from '../patients/patients.entity';
import { MdtAssessment } from './mdt_assessment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mdts, Patients, MdtAssessment])],
  providers: [MdtsService],
  controllers: [MdtsController]
})
export class MdtsModule {}
