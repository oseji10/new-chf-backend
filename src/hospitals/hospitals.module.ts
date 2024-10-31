import { Module } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { HospitalsController } from './hospitals.controller';
import { Hospitals } from './hospitals.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctors } from '../doctors/doctors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hospitals, Doctors])],
  providers: [HospitalsService],
  controllers: [HospitalsController],
  exports: [HospitalsService], // Export HospitalsService here
})
export class HospitalsModule {}
