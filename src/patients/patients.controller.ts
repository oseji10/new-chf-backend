import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseFilters, Req, NotFoundException } from '@nestjs/common';
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
import { PatientNextOfKin } from './patient_next_of_kin.entity';
import { SocialWorkerAssessment } from './social_worker_assessment.entity';
import { SocialCondition } from './social_condition.entity';

@Controller('patients')
// @UseFilters(UnauthorizedExceptionFilter)

export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}
  
  @Get('wallet-balance')
  @UseGuards(JwtAuthGuard) 
  @UseFilters(UnauthorizedExceptionFilter)
  walletBalance(@CurrentUser() user: Users) {
      return this.patientsService.walletBalance(user.userId);
  }
  

  @Get('applications')
  @Roles(Role.DOCTOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Post('next-of-kin')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  async addNextOfKin(
      @CurrentUser() user: Users, // Assuming `user` is of type `Users`
      @Body() nextOfKinData: Partial<PatientNextOfKin>,
  ): Promise<PatientNextOfKin> {
      return this.patientsService.addNextOfKin(user.userId, nextOfKinData); // Pass userId as a number
  }

  @Post('personal-history')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  async createPatientPersonalHisotry(
    @CurrentUser() user: Users, // Assuming `user` is of type `Users`
    @Body() personalHistoryData: Partial<PatientPersonalHistory>,
  ): Promise<PatientPersonalHistory> {
      return this.patientsService.createPatientPersonalHistory(user.userId, personalHistoryData); // Pass userId and data
  }

  @Post('family-history')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  async createPatientFamilyHistory(
    @CurrentUser() user: Users, // Assuming `user` is of type `Users`
    @Body() familyHistoryData: Partial<PatientFamilyHistory>,
  ): Promise<PatientFamilyHistory> {
      return this.patientsService.createPatientFamilyHistory(user.userId, familyHistoryData); // Pass userId and data
  }
  

  @UseGuards(JwtAuthGuard) 
  @Get('profile-percentage')
  async getProfilePercentage(@Req() req): Promise<string> {
    const userId = req.user.userId; // Assuming req.user contains the logged-in user info
    return this.patientsService.getProfilePercentageComplete(userId);
  }
  


  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getPatientDetails(@Req() req): Promise<Patients> {
    const userId = req.user?.userId;
    console.log("User ID from session:", userId); // Debugging check
  
    if (!userId) {
      throw new NotFoundException('User not authenticated');
    }
  
    const patient = await this.patientsService.findPatientByLoggedUserId(userId);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
  
    return patient;
  }
  


  @Post('social-worker-assessment')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  async createWorkerAssessment(
    @CurrentUser() user: Users, // Assuming `user` is of type `Users`
    @Body() workerAssessmentData: Partial<SocialWorkerAssessment>,
  ): Promise<SocialWorkerAssessment> {
      return this.patientsService.createWorkerAssessment(user.userId, workerAssessmentData); // Pass userId and data
  }



  @Post('social-condition')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  async createSocialCondition(
    @CurrentUser() user: Users, // Assuming `user` is of type `Users`
    @Body() socialConditionData: Partial<SocialCondition>,
  ): Promise<SocialCondition> {
      return this.patientsService.createSocialCondition(user.userId, socialConditionData); // Pass userId and data
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
