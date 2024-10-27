import { Module } from '@nestjs/common';
import { CancersService } from './cancers.service';
import { CancersController } from './cancers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancers } from './cancers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cancers])],
  providers: [CancersService],
  controllers: [CancersController]
})
export class CancersModule {}
