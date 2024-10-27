import { Module } from '@nestjs/common';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { States } from './states.entity';
import { Regions } from './regions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([States, Regions])],
  providers: [StatesService],
  controllers: [StatesController]
})
export class StatesModule {}
