import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patients } from './patients.entity';
import * as bcrypt from 'bcrypt';
import { PatientFamilyHistory } from './patient_family_history.entity';
import { PatientPersonalHistory } from './patient_personal_history.entity';
import { PatientNextOfKin } from './patient_next_of_kin.entity';
import { PatientEwallet } from './patient_ewallet.entity';
import { PatientEwalletTopupRequest } from './patient_ewallet_topup.entity';
import { Users } from '../users/users.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patients)
    private readonly patientsRepository: Repository<Patients>,

    @InjectRepository(PatientFamilyHistory)
    private patientFamilyHistoryRepository: Repository<PatientFamilyHistory>,

    @InjectRepository(PatientPersonalHistory)
    private patientPersonalHistoryRepository: Repository<PatientPersonalHistory>,

    @InjectRepository(PatientNextOfKin)
    private patientNextOfKinRepository: Repository<PatientNextOfKin>,

    @InjectRepository(PatientEwallet)
    private patientEwalletRepository: Repository<PatientEwallet>,

    @InjectRepository(PatientEwalletTopupRequest)
    private patientEwalletTopupRequestRepository: Repository<PatientEwalletTopupRequest>,
  ) {}


    // Find all patients
    findAll(): Promise<Patients[]> {
        return this.patientsRepository.find();
      }

      async create(userId: number, userData: Partial<Patients>): Promise<Patients> {
        const newPatient = this.patientsRepository.create({
            ...userData,
            user: { userId }, // This assumes you want to associate the user via user object
        });
        return await this.patientsRepository.save(newPatient);
    }
    
    async createPatientPersonalHistory(
      userId: number,
      personalHistoryData: Partial<PatientPersonalHistory>
    ): Promise<PatientPersonalHistory> {
        const newPersonalHistory = this.patientPersonalHistoryRepository.create({
          ...personalHistoryData,
          user: { userId }  // Assuming user is related by userId
        });
        return await this.patientPersonalHistoryRepository.save(newPersonalHistory);
    }

    async createPatientFamilyHistory(
      userId: number,
      familyHistoryData: Partial<PatientFamilyHistory>
    ): Promise<PatientFamilyHistory> {
        const newFamilyHistory = this.patientFamilyHistoryRepository.create({
          ...familyHistoryData,
          user: { userId }  // Assuming user is related by userId
        });
        return await this.patientFamilyHistoryRepository.save(newFamilyHistory);
    }
    

  
  async findByEmail(chfId: string): Promise<Patients | undefined> {
    // Ensure we use findOne to get a single Patients instance
    return await this.patientsRepository.findOne({ where: { chfId } });
  }

  async findById(chfId: string): Promise<Patients | undefined> {
    // Ensure we use findOne to get a single Patients instance
    return await this.patientsRepository.findOne({ where: { chfId } });
  }
}
