import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { PatientsModule } from './patients/patients.module';
import { HospitalEwallet } from './hospitals/hospital_ewallet.entity';
import { HospitalsModule } from './hospitals/hospitals.module';
import { CancersModule } from './cancers/cancers.module';
import { StatesModule } from './states/states.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guards';
import { Doctors } from './doctors/doctors.entity';
import { DoctorsModule } from './doctors/doctors.module';
import { SocialWorkersModule } from './social_workers/social_worker.module';
import { MdtsModule } from './mdt/mdt.module';
import { CmdsModule } from './cmd/cmd.module';
import { SecretariatsModule } from './secretariat/secretariat.module';

dotenv.config();

@Module({
  imports: [
    // JwtModule.register({
    //   secret: '6ytrew21!2wsxzaQ1!AgrippaZ',
    //   signOptions: { expiresIn: '1h' },
    // }),
    TypeOrmModule.forRoot({
      // host: process.env.DB_HOST,
      // port: +process.env.DB_PORT,
      // type: 'postgres',
      // username: process.env.DB_USERNAME || 'postgres',
      // password: process.env.DB_PASSWORD || '2wsxzaQ1!',
      // database: process.env.DB_DATABASE || 'chf',

      host: 'localhost',
      port: 3306,
      type: 'mysql',
      username: "ileahzto_oseji10",
      password: "6ytrew21!2wsxzaQ1!",
      database: "ileahzto_chf",

      // host: 'localhost',
      // port: 3306,
      // type: 'mysql',
      // username: "root",
      // password: "2wsxzaQ1!",
      // database: "chf",

      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [join(__dirname, 'migrations/*.ts')],
      synchronize: true,
      logging: true,
    }),
    UsersModule, 
    AuthModule,
    PatientsModule,
    HospitalsModule,
    CancersModule,
    StatesModule,
    DoctorsModule,
    SocialWorkersModule,
    MdtsModule, 
    CmdsModule,
    SecretariatsModule
    
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
