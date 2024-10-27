import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CancersService } from './cancers.service';
import { Cancers } from './cancers.entity';

@Controller('cancers')
export class CancersController {
  constructor(private readonly cancersService: CancersService) {}

  @Get()
  findAll() {
    return this.cancersService.findAll();
  }

  @Get(':cancerId')
  findOne(@Param('cancerId') cancerId: string) {
    return this.cancersService.findOne(cancerId);
  }

  @Post()
  create(@Body() cancers: Cancers) {
    return this.cancersService.create(cancers);
  }

  @Put(':cancerId')
  update(@Param('cancerId') cancerId: string, @Body() cancers: Cancers) {
    return this.cancersService.update(cancerId, cancers);
  }

  @Delete(':cancerId')
  remove(@Param('cancerId') cancerId: string) {
    return this.cancersService.remove(cancerId);
  }
}
