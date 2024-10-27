import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseFilters } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patients } from './patients.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UnauthorizedExceptionFilter } from '../unauthorized-exception.filter';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Users } from '../users/users.entity';
import { PatientPersonalHistory } from './patient_personal_history.entity';
import { PatientFamilyHistory } from './patient_family_history.entity';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guards';

@Controller('patients')
// @UseFilters(UnauthorizedExceptionFilter)

export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}
  
  @Get()
  @UseGuards(JwtAuthGuard) 
  @UseFilters(UnauthorizedExceptionFilter) 
  findAll() {
    return this.patientsService.findAll();
  }

  
  @Post('biodata')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  async create(
      @CurrentUser() user: Users, // Assuming `user` is of type `Users`
      @Body() patientData: Partial<Patients>,
  ): Promise<Patients> {
      return this.patientsService.create(user.userId, patientData); // Pass userId as a number
  }

  @Post('personal_history')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  async createPatientPersonalHisotry(
    @CurrentUser() user: Users, // Assuming `user` is of type `Users`
    @Body() personalHistoryData: Partial<PatientPersonalHistory>,
  ): Promise<PatientPersonalHistory> {
      return this.patientsService.createPatientPersonalHistory(user.userId, personalHistoryData); // Pass userId and data
  }

  @Post('family_history')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  async createPatientFamilyHistory(
    @CurrentUser() user: Users, // Assuming `user` is of type `Users`
    @Body() familyHistoryData: Partial<PatientFamilyHistory>,
  ): Promise<PatientFamilyHistory> {
      return this.patientsService.createPatientFamilyHistory(user.userId, familyHistoryData); // Pass userId and data
  }
  

  
  

//   @Put(':id')
//   update(@Param('id') id: string, @Body() patients: Patients) {
//     return this.patientsService.update(id, patients);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.patientsService.remove(id);
//   }
}
