import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialWorkers } from './social_worker.entity';

import { Patients } from '../patients/patients.entity';
import { SocialWorkerAssessment } from '../patients/social_worker_assessment.entity';
import { SocialCondition } from '../patients/social_condition.entity';

@Injectable()
export class SocialWorkersService {
  constructor(
    @InjectRepository(SocialWorkers)
    private socialworkersRepository: Repository<SocialWorkers>,

   
    @InjectRepository(Patients)
    private patientsRepository: Repository<Patients>,
  
    @InjectRepository(SocialWorkerAssessment)
    private workerAssessmentRepository: Repository<SocialWorkerAssessment>,

    @InjectRepository(SocialCondition)
    private socialConditionRepository: Repository<SocialCondition>,

    
  ) {}

  findAll(): Promise<SocialWorkers[]> {
    return this.socialworkersRepository.find();
  }

   
  // Get all patients assigned to the logged-in socialworker
  async findAllPatients(socialworkerId: number): Promise<Patients[]> {
    return await this.patientsRepository.find({
      where: { primaryPhysician: { userId: socialworkerId } },
      relations: ['user', 'cancer', 'hospital'], 
      select: {
        user: {
          userId: true,
          email: true,
          phoneNumber: true
        },
        cancer: {
          cancerName: true,
        },
        hospital: {
          hospitalName: true,
          hospitalShortName: true
        },
      },
    });
  }


  // COME BACK TO THESE TWO CODES LATER FOR NOW PULL ALL PATIENTS IRRESPECTIVE OF HOSPITALS

//   async getHospitalIdByUserId(userId: number): Promise<number | undefined> {
//     const socialWorker = await this.socialworkersRepository.findOne({
//         where: { user: { userId } }, // Assuming the relation to Users is set correctly
//         relations: ['hospital'], // Load the hospital relation
//     });

//     return socialWorker?.hospital?.hospitalId; // Return hospitalId or undefined if not found
// }



// async findAllPatientsReviewedByPP(userId: number): Promise<Patients[]> {
//   const hospitalId = await this.getHospitalIdByUserId(userId);

//   if (!hospitalId) {
//       throw new NotFoundException('Hospital not found for the logged-in user');
//   }

//   return await this.patientsRepository.find({
//       where: {
//           isPrimaryPhysicianReviewed: 'yes',
//           hospital: { hospitalId }, // Use the retrieved hospitalId
//       },
//       relations: ['user', 'cancer', 'hospital'], 
//       select: {
//           user: {
//               userId: true,
//               email: true,
//               phoneNumber: true,
//           },
//           cancer: {
//               cancerName: true,
//           },
//           hospital: {
//               hospitalName: true,
//               hospitalShortName: true,
//           },
//       },
//   });
// }

  
  


  findOne(socialworkerId: number): Promise<SocialWorkers> {
    return this.socialworkersRepository.findOne({ where: { socialworkerId }});
  }

  create(socialworkers: SocialWorkers): Promise<SocialWorkers> {
    return this.socialworkersRepository.save(socialworkers);
  }

  
  
  
  async changePatientStatus(
    userId: number, // ID of the logged-in patient (user)
    approvalData: Partial<SocialWorkerAssessment>,
    patientId: number,
  ): Promise<SocialWorkerAssessment> {
    
    // Update the assessment status
    await this.workerAssessmentRepository.update(
      { patient: { userId } },  
      { ...approvalData } 
    );

    await this.socialConditionRepository.update(
      { patient: { userId } },  
      { ...approvalData } 
    );

    await this.patientsRepository.update(
      { user: {userId: patientId }}, 
      { 
        applicationStage: "social_worker_reviewed",
        isSocialWorkerReviewed: "yes" 
    }
  );
  
    // Fetch the updated assessment
    const updatedAssessment = await this.workerAssessmentRepository.findOne({
      where: { patient: { userId } } // Adjust the criteria based on your needs
    });
  
    // Check if the updatedAssessment was found
    if (!updatedAssessment) {
      throw new Error(`Assessment for user ID ${userId} not found`);
    }
  
    return updatedAssessment; 
  }
  

  async update(socialworkerId: number, socialworkers: SocialWorkers): Promise<SocialWorkers> {
    await this.socialworkersRepository.update(socialworkerId, socialworkers);
    return this.findOne(socialworkerId);
  }

  async remove(socialworkerId: string): Promise<void> {
    await this.socialworkersRepository.delete(socialworkerId);
  }
}
