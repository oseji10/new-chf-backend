import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseFilters, Req, NotFoundException, Patch, ParseIntPipe, Request } from '@nestjs/common';
import { SecretariatsService } from './secretariat.service';
import { Secretariats } from './secretariat.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guards';
import { UnauthorizedExceptionFilter } from 'src/unauthorized-exception.filter';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';


import { Users } from '../users/users.entity';
import { Patients } from 'src/patients/patients.entity';
// import { SecretariatAssessment } from 'src/patients/social_worker_assessment.entity';
import { UpdateSecretariatAssessmentDto } from './updateSecretariatAssessment.dto';
import { SecretariatAssessment } from './secretariat_assessment.entity';
import { PatientsService } from '../patients/patients.service';

@Controller('secretariat')
export class SecretariatsController {
  constructor(private readonly secretariatsService: SecretariatsService,
    private readonly patientsService: PatientsService
  ) { }


  @UseGuards(JwtAuthGuard) // Apply the guard here
  @Get('all-patients')
  async findAllPatients(@Request() req) {
      return this.secretariatsService.findAllPatients(req);
  }

  // @Get()
  // @Roles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @UseFilters(UnauthorizedExceptionFilter)
  // findAll() {
  //   return this.secretariatsService.findAll();
  // }


  // @Get('patients')
  // @UseGuards(JwtAuthGuard)
  // async findAllPatients(@CurrentUser() user: Users) {
  //   return this.secretariatsService.findAllPatients(user.userId);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('all-patients')
  // findAll() {
  //   return this.secretariatsService.findAll();
  // }

  // @UseGuards(JwtAuthGuard) // Apply the guard here
  // @Get('patients')
  // async findAllPatients(@Request() req) {
  //     return this.secretariatsService.findAllPatients(req);
  // }

  // @Patch(':userId/patient-status') // Route to change the patient status
  // async changePatientStatus(
  //   @Param('userId', ParseIntPipe) userId: number, // Extract and validate userId
  //   @Body() approvalData: UpdateSecretariatAssessmentDto // Use a DTO for the request body
  // ): Promise<SecretariatAssessment> {
  //   try {
  //     return await this.secretariatsService.changePatientStatus(userId, approvalData);
  //   } catch (error) {
  //     // Handle not found or other errors
  //     throw new NotFoundException(error.message);
  //   }
  // }





  @Get(':secretariatId')
  findOne(@Param('secretariatId') secretariatId: number) {
    return this.secretariatsService.findOne(secretariatId);
  }


  @Post('biodata')
  // @Roles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  create(@Body() secretariats: Secretariats) {
    return this.secretariatsService.create(secretariats);
  }

  @Post('approval')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  async createSecretariatAssessment(
      @CurrentUser() user: Users, 
      @Body() patientData: Partial<SecretariatAssessment> & { patientId: number, isApproved: string  }, 
  ): Promise<SecretariatAssessment> {
     
      return this.secretariatsService.createSecretariatAssessment(user.userId, patientData.patientId, patientData.isApproved, patientData);
  }



  @Patch(':userId/patient-status') // Route to change the patient status
  async changePatientStatus(
    @Param('userId', ParseIntPipe) userId: number, 
    @Body() approvalData: UpdateSecretariatAssessmentDto  & { patientId: number }
  ): Promise<SecretariatAssessment> {
    try {
      return await this.secretariatsService.changePatientStatus(userId, approvalData, approvalData.patientId);
    } catch (error) {
      // Handle not found or other errors
      throw new NotFoundException(error.message);
    }
  }

  // @Put(':secretariatId')
  // update(@Param('secretariatId') secretariatId: number, @Body() secretariats: Secretariats) {
  //   return this.secretariatsService.update(secretariatId, secretariats);
  // }

  // @Delete(':secretariatId')
  // remove(@Param('secretariatId') secretariatId: string) {
  //   return this.secretariatsService.remove(secretariatId);
  // }



  // @Get('patients-reviewed')
  // @UseGuards(JwtAuthGuard)
  // async getReviewedPatients(@Req() req): Promise<Patients[]> {
  //   const userId = req.user?.userId; // Assuming user ID is stored as `userId` on req.user

  //   if (!userId) {
  //     throw new NotFoundException('User not authenticated');
  //   }

  //   return await this.secretariatsService.findAllPatientsReviewedByPP(userId);
  // }
}
