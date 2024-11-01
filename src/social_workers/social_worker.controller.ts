import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseFilters, Req, NotFoundException, Patch, ParseIntPipe } from '@nestjs/common';
import { SocialWorkersService } from './social_worker.service';
import { SocialWorkers } from './social_worker.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guards';
import { UnauthorizedExceptionFilter } from 'src/unauthorized-exception.filter';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { PatientsService } from '../patients/patients.service';
import { Users } from '../users/users.entity';
import { Patients } from 'src/patients/patients.entity';
import { SocialWorkerAssessment } from 'src/patients/social_worker_assessment.entity';
import { UpdateSocialWorkerAssessmentDto } from './updateSocialWorkerAssessment.dto';

@Controller('socialworkers')
export class SocialWorkersController {
  constructor(private readonly socialworkersService: SocialWorkersService,
    // private readonly patientsService: PatientsService
  ) { }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  findAll() {
    return this.socialworkersService.findAll();
  }


  @Get('patients')
  @UseGuards(JwtAuthGuard)
  async findAllPatients(@CurrentUser() user: Users) {
    return this.socialworkersService.findAllPatients(user.userId);
  }


  @Patch(':userId/patient-status') // Route to change the patient status
  async changePatientStatus(
    @Param('userId', ParseIntPipe) userId: number, // Extract and validate userId
    @Body() approvalData: UpdateSocialWorkerAssessmentDto // Use a DTO for the request body
  ): Promise<SocialWorkerAssessment> {
    try {
      return await this.socialworkersService.changePatientStatus(userId, approvalData);
    } catch (error) {
      // Handle not found or other errors
      throw new NotFoundException(error.message);
    }
  }





  @Get(':socialworkerId')
  findOne(@Param('socialworkerId') socialworkerId: number) {
    return this.socialworkersService.findOne(socialworkerId);
  }


  @Post('biodata')
  // @Roles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  create(@Body() socialworkers: SocialWorkers) {
    return this.socialworkersService.create(socialworkers);
  }

  @Put(':socialworkerId')
  update(@Param('socialworkerId') socialworkerId: number, @Body() socialworkers: SocialWorkers) {
    return this.socialworkersService.update(socialworkerId, socialworkers);
  }

  @Delete(':socialworkerId')
  remove(@Param('socialworkerId') socialworkerId: string) {
    return this.socialworkersService.remove(socialworkerId);
  }



  // @Get('patients-reviewed')
  // @UseGuards(JwtAuthGuard)
  // async getReviewedPatients(@Req() req): Promise<Patients[]> {
  //   const userId = req.user?.userId; // Assuming user ID is stored as `userId` on req.user

  //   if (!userId) {
  //     throw new NotFoundException('User not authenticated');
  //   }

  //   return await this.socialworkersService.findAllPatientsReviewedByPP(userId);
  // }
}
