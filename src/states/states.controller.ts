import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StatesService } from './states.service';
import { States } from './states.entity';
import { AuthGuard } from '@nestjs/passport';
import { Regions } from './regions.entity';

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

  @Post('regions')
  createRegions(@Body() regions: Regions) {
    return this.statesService.createRegions(regions);
  }

  @Put(':stateId')
  update(@Param('stateId') stateId: number, @Body() states: States) {
    return this.statesService.update(stateId, states);
  }

  @Delete(':stateId')
  remove(@Param('stateId') stateId: number) {
    return this.statesService.remove(stateId);
  }
}
