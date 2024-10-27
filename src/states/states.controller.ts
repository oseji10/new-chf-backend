import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { StatesService } from './states.service';
import { States } from './states.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}
  @UseGuards(AuthGuard('session'))
  
  @Get()
  findAll() {
    return this.statesService.findAll();
  }

  @Get(':stateId')
  findOne(@Param('stateId') stateId: number) {
    return this.statesService.findOne(stateId);
  }

  @Post()
  create(@Body() states: States) {
    return this.statesService.create(states);
  }

  @Put(':stateId')
  update(@Param('stateId') stateId: number, @Body() states: States) {
    return this.statesService.update(stateId, states);
  }

  @Delete(':stateId')
  remove(@Param('stateId') stateId: string) {
    return this.statesService.remove(stateId);
  }
}
