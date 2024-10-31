import { Module } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
// import { Users } from './users.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "6ytrew21!2wsxzaQ1!AgrippaZ", // Replace with a secure key
      signOptions: { expiresIn: '24h' }, // Set token expiration if desired
    }),
    TypeOrmModule.forFeature([Users])],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, ],
})
export class AuthModule {}
