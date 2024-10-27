import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospitals } from './hospitals.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectRepository(Hospitals)
    private readonly hospitalsRepository: Repository<Hospitals>,
  ) {}


    // Find all hospitals
    findAll(): Promise<Hospitals[]> {
        return this.hospitalsRepository.find();
      }

  async create(userData: Partial<Hospitals>): Promise<Hospitals> {
    const newUser = this.hospitalsRepository.create({
        ...userData,
        
      });
    return await this.hospitalsRepository.save(newUser);
  }


// async create(email: string, password: string, phoneNumber: string): Promise<Hospitals> {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = this.hospitalsRepository.create({
//       email,
//       password: hashedPassword,
//       phoneNumber,
      
//     });

//     return this.hospitalsRepository.save(newUser);  // Save the new user to the database
//   }
  
  async findByEmail(hospitalId: string): Promise<Hospitals | undefined> {
    // Ensure we use findOne to get a single Hospitals instance
    return await this.hospitalsRepository.findOne({ where: { hospitalId } });
  }

  async findById(hospitalId: string): Promise<Hospitals | undefined> {
    // Ensure we use findOne to get a single Hospitals instance
    return await this.hospitalsRepository.findOne({ where: { hospitalId } });
  }
}
