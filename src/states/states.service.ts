import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { States } from './states.entity';
import { Regions } from './regions.entity';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(States)
    private statesRepository: Repository<States>,

    @InjectRepository(Regions)
    private regionsRepository: Repository<Regions>,
  ) {}

  findAll(): Promise<States[]> {
    return this.statesRepository.find();
  }

  findOne(stateId: number): Promise<States> {
    return this.statesRepository.findOne({ where: { stateId } });
  }

  create(states: States): Promise<States> {
    return this.statesRepository.save(states);
  }

  createRegions(regions: Regions): Promise<Regions> {
    return this.regionsRepository.save(regions);
  }

  async update(stateId: number, states: States): Promise<States> {
    await this.statesRepository.update(stateId, states);
    return this.findOne(stateId);
  }

  async remove(stateId: number): Promise<void> {
    await this.statesRepository.delete(stateId);
  }
}
