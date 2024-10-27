import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseFilters } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patients } from './patients.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UnauthorizedExceptionFilter } from '../unauthorized-exception.filter';

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

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.patientsService.findOne(id);
//   }

  @Post()
  create(@Body() patients: Patients) {
    return this.patientsService.create(patients);
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
