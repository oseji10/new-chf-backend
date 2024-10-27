import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancers } from './cancers.entity';

@Injectable()
export class CancersService {
  constructor(
    @InjectRepository(Cancers)
    private cancersRepository: Repository<Cancers>,
  ) {}

  findAll(): Promise<Cancers[]> {
    return this.cancersRepository.find();
  }

  findOne(cancerId: string): Promise<Cancers> {
    return this.cancersRepository.findOne({ where: { cancerId }});
  }

  create(cancers: Cancers): Promise<Cancers> {
    return this.cancersRepository.save(cancers);
  }

  async update(cancerId: string, cancers: Cancers): Promise<Cancers> {
    await this.cancersRepository.update(cancerId, cancers);
    return this.findOne(cancerId);
  }

  async remove(cancerId: string): Promise<void> {
    await this.cancersRepository.delete(cancerId);
  }
}
