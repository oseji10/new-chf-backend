import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patients } from './patients.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patients)
    private readonly patientsRepository: Repository<Patients>,
  ) {}


    // Find all patients
    findAll(): Promise<Patients[]> {
        return this.patientsRepository.find();
      }

  async create(userData: Partial<Patients>): Promise<Patients> {
    const salt = await bcrypt.genSalt(10); // Salt rounds can be adjusted
        const newUser = this.patientsRepository.create({
        ...userData,
       
      });
    return await this.patientsRepository.save(newUser);
  }


// async create(email: string, password: string, phoneNumber: string): Promise<Patients> {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = this.patientsRepository.create({
//       email,
//       password: hashedPassword,
//       phoneNumber,
      
//     });

//     return this.patientsRepository.save(newUser);  // Save the new user to the database
//   }
  
  async findByEmail(chfId: string): Promise<Patients | undefined> {
    // Ensure we use findOne to get a single Patients instance
    return await this.patientsRepository.findOne({ where: { chfId } });
  }

  async findById(chfId: string): Promise<Patients | undefined> {
    // Ensure we use findOne to get a single Patients instance
    return await this.patientsRepository.findOne({ where: { chfId } });
  }
}
