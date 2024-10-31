import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseFilters } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Doctors } from './doctors.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guards';
import { UnauthorizedExceptionFilter } from 'src/unauthorized-exception.filter';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { PatientCarePlan } from './patient_care_plan.entity';
import { PatientsService } from '../patients/patients.service';
import { Users } from '../users/users.entity';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService, 
    // private readonly patientsService: PatientsService
  ) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseFilters(UnauthorizedExceptionFilter) 
  findAll() {
    return this.doctorsService.findAll();
  }


  @Get('patients')
  @UseGuards(JwtAuthGuard)
  async findAllPatients(@CurrentUser() user: Users) {
    return this.doctorsService.findAllPatients(user.userId);
  }
  

  @Post('careplan')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  async createCarePlan(
      @CurrentUser() user: Users, 
      @Body() patientData: Partial<PatientCarePlan> & { patientId: number }, 
  ): Promise<PatientCarePlan> {
     
      return this.doctorsService.createCarePlan(user.userId, patientData.patientId, patientData);
  }
  
  
  


  @Get(':doctorId')
  findOne(@Param('doctorId') doctorId: number) {
    return this.doctorsService.findOne(doctorId);
  }

  
  @Post('biodata')
  // @Roles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter) 
  create(@Body() doctors: Doctors) {
    return this.doctorsService.create(doctors);
  }

  @Put(':doctorId')
  update(@Param('doctorId') doctorId: number, @Body() doctors: Doctors) {
    return this.doctorsService.update(doctorId, doctors);
  }

  @Delete(':doctorId')
  remove(@Param('doctorId') doctorId: string) {
    return this.doctorsService.remove(doctorId);
  }
}
