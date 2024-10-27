import { Module } from '@nestjs/common';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { States } from './states.entity';

@Module({
  imports: [TypeOrmModule.forFeature([States])],
  providers: [StatesService],
  controllers: [StatesController]
})
export class StatesModule {}
