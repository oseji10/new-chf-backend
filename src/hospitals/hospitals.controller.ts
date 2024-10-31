import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseFilters } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { Hospitals } from './hospitals.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UnauthorizedExceptionFilter } from '../unauthorized-exception.filter';

@Controller('hospitals')
// @UseFilters(UnauthorizedExceptionFilter)

export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}
  
  @Get()
  // @UseGuards(JwtAuthGuard) 
  @UseFilters(UnauthorizedExceptionFilter) 
  findAll() {
    return this.hospitalsService.findAll();
  }

  @Get(':hospitalId/doctors')
  async findDoctorsByHospital(@Param('hospitalId') hospitalId: number) {
    return this.hospitalsService.findDoctorsByHospital(hospitalId);
  }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.hospitalsService.findOne(id);
//   }

  @Post()
  create(@Body() hospitals: Hospitals) {
    return this.hospitalsService.create(hospitals);
  }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() hospitals: Hospitals) {
//     return this.hospitalsService.update(id, hospitals);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.hospitalsService.remove(id);
//   }
}
