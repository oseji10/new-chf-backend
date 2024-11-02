import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseFilters, Req, NotFoundException, Patch, ParseIntPipe, Request } from '@nestjs/common';
import { CmdsService } from './cmd.service';
import { Cmds } from './cmd.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guards';
import { UnauthorizedExceptionFilter } from 'src/unauthorized-exception.filter';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';


import { Users } from '../users/users.entity';
import { Patients } from 'src/patients/patients.entity';
// import { CmdAssessment } from 'src/patients/social_worker_assessment.entity';
import { UpdateCmdAssessmentDto } from './updateCmdAssessment.dto';
import { CmdAssessment } from './cmd_assessment.entity';

@Controller('cmds')
export class CmdsController {
  constructor(private readonly cmdsService: CmdsService,
    // private readonly patientsService: PatientsService
  ) { }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  findAll() {
    return this.cmdsService.findAll();
  }


  // @Get('patients')
  // @UseGuards(JwtAuthGuard)
  // async findAllPatients(@CurrentUser() user: Users) {
  //   return this.cmdsService.findAllPatients(user.userId);
  // }


  @UseGuards(JwtAuthGuard) // Apply the guard here
  @Get('patients')
  async findAllPatients(@Request() req) {
      return this.cmdsService.findAllPatients(req);
  }

  // @Patch(':userId/patient-status') // Route to change the patient status
  // async changePatientStatus(
  //   @Param('userId', ParseIntPipe) userId: number, // Extract and validate userId
  //   @Body() approvalData: UpdateCmdAssessmentDto // Use a DTO for the request body
  // ): Promise<CmdAssessment> {
  //   try {
  //     return await this.cmdsService.changePatientStatus(userId, approvalData);
  //   } catch (error) {
  //     // Handle not found or other errors
  //     throw new NotFoundException(error.message);
  //   }
  // }





  @Get(':cmdId')
  findOne(@Param('cmdId') cmdId: number) {
    return this.cmdsService.findOne(cmdId);
  }


  @Post('biodata')
  // @Roles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  create(@Body() cmds: Cmds) {
    return this.cmdsService.create(cmds);
  }

  @Post('cmd-assessment')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  async createCmdAssessment(
      @CurrentUser() user: Users, 
      @Body() patientData: Partial<CmdAssessment> & { patientId: number, isApproved: string  }, 
  ): Promise<CmdAssessment> {
     
      return this.cmdsService.createCmdAssessment(user.userId, patientData.patientId, patientData.isApproved, patientData);
  }



  @Patch(':userId/patient-status') // Route to change the patient status
  async changePatientStatus(
    @Param('userId', ParseIntPipe) userId: number, 
    @Body() approvalData: UpdateCmdAssessmentDto  & { patientId: number }
  ): Promise<CmdAssessment> {
    try {
      return await this.cmdsService.changePatientStatus(userId, approvalData, approvalData.patientId);
    } catch (error) {
      // Handle not found or other errors
      throw new NotFoundException(error.message);
    }
  }

  // @Put(':cmdId')
  // update(@Param('cmdId') cmdId: number, @Body() cmds: Cmds) {
  //   return this.cmdsService.update(cmdId, cmds);
  // }

  // @Delete(':cmdId')
  // remove(@Param('cmdId') cmdId: string) {
  //   return this.cmdsService.remove(cmdId);
  // }



  // @Get('patients-reviewed')
  // @UseGuards(JwtAuthGuard)
  // async getReviewedPatients(@Req() req): Promise<Patients[]> {
  //   const userId = req.user?.userId; // Assuming user ID is stored as `userId` on req.user

  //   if (!userId) {
  //     throw new NotFoundException('User not authenticated');
  //   }

  //   return await this.cmdsService.findAllPatientsReviewedByPP(userId);
  // }
}
