import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseFilters, Req, NotFoundException, Patch, ParseIntPipe, Request } from '@nestjs/common';
import { MdtsService } from './mdt.service';
import { Mdts } from './mdt.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guards';
import { UnauthorizedExceptionFilter } from 'src/unauthorized-exception.filter';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { PatientsService } from '../patients/patients.service';
import { Users } from '../users/users.entity';
import { Patients } from 'src/patients/patients.entity';
// import { MdtAssessment } from 'src/patients/social_worker_assessment.entity';
import { UpdateMdtAssessmentDto } from './updateMdtAssessment.dto';
import { MdtAssessment } from './mdt_assessment.entity';

@Controller('mdts')
export class MdtsController {
  constructor(private readonly mdtsService: MdtsService,
    // private readonly patientsService: PatientsService
  ) { }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  findAll() {
    return this.mdtsService.findAll();
  }


  // @Get('patients')
  // @UseGuards(JwtAuthGuard)
  // async findAllPatients(@CurrentUser() user: Users) {
  //   return this.mdtsService.findAllPatients(user.userId);
  // }

  @UseGuards(JwtAuthGuard) // Apply the guard here
  @Get('patients')
  async findAllPatients(@Request() req) {
      return this.mdtsService.findAllPatients(req);
  }

  // @Patch(':userId/patient-status') // Route to change the patient status
  // async changePatientStatus(
  //   @Param('userId', ParseIntPipe) userId: number, // Extract and validate userId
  //   @Body() approvalData: UpdateMdtAssessmentDto // Use a DTO for the request body
  // ): Promise<MdtAssessment> {
  //   try {
  //     return await this.mdtsService.changePatientStatus(userId, approvalData);
  //   } catch (error) {
  //     // Handle not found or other errors
  //     throw new NotFoundException(error.message);
  //   }
  // }





  @Get(':mdtId')
  findOne(@Param('mdtId') mdtId: number) {
    return this.mdtsService.findOne(mdtId);
  }


  @Post('biodata')
  // @Roles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  create(@Body() mdts: Mdts) {
    return this.mdtsService.create(mdts);
  }

  @Post('mdt-assessment')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  async createMdtAssessment(
      @CurrentUser() user: Users, 
      @Body() patientData: Partial<MdtAssessment> & { patientId: number }, 
  ): Promise<MdtAssessment> {
     
      return this.mdtsService.createMdtAssessment(user.userId, patientData.patientId, patientData);
  }



  @Patch(':userId/patient-status') // Route to change the patient status
  async changePatientStatus(
    @Param('userId', ParseIntPipe) userId: number, 
    @Body() approvalData: UpdateMdtAssessmentDto  & { patientId: number }
  ): Promise<MdtAssessment> {
    try {
      return await this.mdtsService.changePatientStatus(userId, approvalData, approvalData.patientId);
    } catch (error) {
      // Handle not found or other errors
      throw new NotFoundException(error.message);
    }
  }

  // @Put(':mdtId')
  // update(@Param('mdtId') mdtId: number, @Body() mdts: Mdts) {
  //   return this.mdtsService.update(mdtId, mdts);
  // }

  // @Delete(':mdtId')
  // remove(@Param('mdtId') mdtId: string) {
  //   return this.mdtsService.remove(mdtId);
  // }



  // @Get('patients-reviewed')
  // @UseGuards(JwtAuthGuard)
  // async getReviewedPatients(@Req() req): Promise<Patients[]> {
  //   const userId = req.user?.userId; // Assuming user ID is stored as `userId` on req.user

  //   if (!userId) {
  //     throw new NotFoundException('User not authenticated');
  //   }

  //   return await this.mdtsService.findAllPatientsReviewedByPP(userId);
  // }
}
