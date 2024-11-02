import { Module } from '@nestjs/common';
import { CmdsService } from './cmd.service';
import { CmdsController } from './cmd.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cmds } from './cmd.entity';

import { PatientsService } from 'src/patients/patients.service';
import { Patients } from '../patients/patients.entity';
import { CmdAssessment } from './cmd_assessment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cmds, Patients, CmdAssessment])],
  providers: [CmdsService],
  controllers: [CmdsController]
})
export class CmdsModule {}
