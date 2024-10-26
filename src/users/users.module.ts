import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Export UsersService here
})
export class UsersModule {}
