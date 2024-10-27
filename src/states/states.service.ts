import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { States } from './states.entity';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(States)
    private statesRepository: Repository<States>,
  ) {}

  findAll(): Promise<States[]> {
    return this.statesRepository.find();
  }

  findOne(stateId: number): Promise<States> {
    return this.statesRepository.findOne({ where: { stateId }});
  }

  create(states: States): Promise<States> {
    return this.statesRepository.save(states);
  }

  async update(stateId: number, states: States): Promise<States> {
    await this.statesRepository.update(stateId, states);
    return this.findOne(stateId);
  }

  async remove(id: string): Promise<void> {
    await this.statesRepository.delete(id);
  }
}
