import { Module } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { HospitalsController } from './hospitals.controller';
import { Hospitals } from './hospitals.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Hospitals])],
  providers: [HospitalsService],
  controllers: [HospitalsController],
  exports: [HospitalsService], // Export HospitalsService here
})
export class HospitalsModule {}
