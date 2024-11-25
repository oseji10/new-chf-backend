import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospitals } from './hospitals.entity';
import * as bcrypt from 'bcrypt';
import { Doctors } from '../doctors/doctors.entity';
import { States } from '../states/states.entity';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectRepository(Hospitals)
    private readonly hospitalsRepository: Repository<Hospitals>,
    @InjectRepository(Doctors)
    private doctorsRepository: Repository<Doctors>,
  ) {}


    // Find all hospitals
    findAll(): Promise<Hospitals[]> {
        return this.hospitalsRepository.find();
      }

      async findDoctorsByHospital(hospitalId: number) {
        return this.doctorsRepository.find({
          where: { hospital: { hospitalId: hospitalId } },
          relations: ['hospital', 'user'], 
          select: {
            user:{
              userId: true
            }   
        },
        });
      }
      

  async create(userData: Partial<Hospitals>): Promise<Hospitals> {
    const newUser = this.hospitalsRepository.create({
        ...userData,
        
      });
    return await this.hospitalsRepository.save(newUser);
  }


  // Method to find all hospitals in a specific state
  async findHospitalsByState(stateId: number): Promise<Hospitals[]> {
    return this.hospitalsRepository.find({
      where: { state: { stateId } },
      // relations: ['state'],  // Include the state relation if you want state details
    });
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
  
  async findByEmail(hospitalId: number): Promise<Hospitals | undefined> {
    // Ensure we use findOne to get a single Hospitals instance
    return await this.hospitalsRepository.findOne({ where: { hospitalId } });
  }

  async findById(hospitalId: number): Promise<Hospitals | undefined> {
    // Ensure we use findOne to get a single Hospitals instance
    return await this.hospitalsRepository.findOne({ where: { hospitalId } });
  }
}
