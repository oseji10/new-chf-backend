import { Injectable, NotFoundException } from '@nestjs/common';
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
import { randomInt } from 'crypto';
import { SocialWorkerAssessment } from './social_worker_assessment.entity';
import { SocialCondition } from './social_condition.entity';

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

    @InjectRepository(SocialWorkerAssessment)
    private workerAssessmentRepository: Repository<SocialWorkerAssessment>,

    @InjectRepository(SocialCondition)
    private socialConditionRepository: Repository<SocialCondition>,

    // @InjectRepository(PatientEwallet)
    // private workerAssessmentRepository: Repository<SocialWorkerAssessment>,

  ) {}


    // Find all patients
    findAll(): Promise<Patients[]> {
        return this.patientsRepository.find();
      }

    //   async create(userId: number, userData: Partial<Patients>): Promise<Patients> {
    //     const newPatient = this.patientsRepository.create({
    //         ...userData,
    //         user: { userId }, // This assumes you want to associate the user via user object
    //     });
    //     return await this.patientsRepository.save(newPatient);
    // }

    async findPatientByUserId(id: number): Promise<Patients | undefined> {
      return await this.patientsRepository.findOne({ where: { id } });
    }

    
    async findPatientByLoggedUserId(userId: number): Promise<Patients | undefined> {
      try {
        const patient = await this.patientsRepository.findOne({
          where: { user: { userId } }, // Ensure field matches exactly in `Users` entity
          relations: ['user'],
        });
        console.log("Patient retrieved:", patient); // Debugging check
        return patient;
      } catch (error) {
        console.error("Error in findPatientByLoggedUserId:", error);
        throw new NotFoundException('Patient not found or query failed');
      }
    }
    

    

    async create(userId: number, userData: Partial<Patients>): Promise<Patients> {
      const currentYear = new Date().getFullYear();
      
      // Generate 10 random numbers (e.g., a string of 10 digits)
      const randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
      
      // Construct CHFId
      const nchfId = `CHF${currentYear}${randomNumbers}`;
      
      const newPatient = this.patientsRepository.create({
          ...userData,
          user: { userId },
          nchfId, // Assign CHFId to the new patient data
      });
  
      return await this.patientsRepository.save(newPatient);
  }


  async addNextOfKin(
    userId: number,
    nextOfKinData: Partial<PatientNextOfKin>
  ): Promise<PatientNextOfKin> {
      const newNextOfKin= this.patientNextOfKinRepository.create({
        ...nextOfKinData,
        user: { userId }  // Assuming user is related by userId
      });
      return await this.patientNextOfKinRepository.save(newNextOfKin);
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
      userId: number, // ID of the logged-in patient (user)
      familyHistoryData: Partial<PatientFamilyHistory>
    ): Promise<PatientFamilyHistory> {
      
      // Create new family history record for the logged-in patient
      const newFamilyHistory = this.patientFamilyHistoryRepository.create({
        ...familyHistoryData,
        user: { userId },  // Associate with the logged-in user (patient)
        updatedBy: { userId } // Optional: if you want to track who updated the record
      });
      
      await this.patientFamilyHistoryRepository.save(newFamilyHistory);
    
      // Update the applicationStage in the Patients table for the logged-in patient
      await this.patientsRepository.update(
        { user: { userId } },  // Target the patient by their userId
        { applicationStage: "registered" }
      );
      
      return newFamilyHistory; // Return the newly created family history record
    }
    
    

  
  async findByEmail(nchfId: string): Promise<Patients | undefined> {
    // Ensure we use findOne to get a single Patients instance
    return await this.patientsRepository.findOne({ where: { nchfId } });
  }

  async findById(nchfId: string): Promise<Patients | undefined> {
    // Ensure we use findOne to get a single Patients instance
    return await this.patientsRepository.findOne({ where: { nchfId } });
  }



  // Method to get profilePercentageComplete based on user ID
  async getProfilePercentageComplete(userId: string): Promise<string> {
    const result = await this.patientsRepository.findOne({
      where: { user: { userId: Number(userId) } },
      select: ['profileCompletionPercentage'],
    });
  
    return result ? result.profileCompletionPercentage : null;
  }
  


  async createWorkerAssessment(
    userId: number, // ID of the logged-in patient (user)
    workerAssessment: Partial<SocialWorkerAssessment>
  ): Promise<SocialWorkerAssessment> {
    // Create new family history record for the logged-in patient
    const newWorkerAssessment = this.workerAssessmentRepository.create({
      ...workerAssessment, // Associate with the logged-in user (patient)
      updatedBy: { userId } // Optional: if you want to track who updated the record
    });
    
    await this.workerAssessmentRepository.save(newWorkerAssessment);
    
    // Return the newly created worker assessment
    return newWorkerAssessment;
  }



  async createSocialCondition(
    userId: number, // ID of the logged-in patient (user)
    socialCondition: Partial<SocialCondition>
  ): Promise<SocialCondition> {
    // Create new family history record for the logged-in patient
    const newSocialCondition = this.socialConditionRepository.create({
      ...socialCondition, // Associate with the logged-in user (patient)
      updatedBy: { userId } // Optional: if you want to track who updated the record
    });
    
    await this.socialConditionRepository.save(newSocialCondition);
    
    // Return the newly created worker assessment
    return newSocialCondition;
  }
  
  

  // async walletBalance(
  //   secretariatId: number, 
  //   patient: number, 
  //   isApproved: string,
  //   recommendationData: Partial<PatientEwallet>
  // ): Promise<PatientEwallet> {
  //   // Step 1: Create a new care plan
  //   const patientQ = await this.patientsRepository.findOne({  where: { user: { userId: patient } } });
    
  //   if (!patientQ) {
  //       throw new Error('Patient not found');
  //   }

  //   return patientQ


  async walletBalance(userId: number): Promise<Partial<PatientEwallet> | null> {
    return this.patientEwalletRepository.findOne({
        where: { user: { userId } },
        select: {
            id: true,         
            credit: true     
        },
    });
}


}
