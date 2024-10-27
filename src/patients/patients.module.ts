import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patients } from './patients.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Patients])],
  providers: [PatientsService],
  controllers: [PatientsController],
  exports: [PatientsService], // Export PatientsService here
})
export class PatientsModule {}
