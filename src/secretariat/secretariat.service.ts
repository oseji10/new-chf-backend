import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Secretariats } from './secretariat.entity';

import { Patients } from '../patients/patients.entity';
// // import { SecretariatAssessment } from '../patients/social_worker_assessment.entity';
// import { SocialCondition } from '../patients/social_condition.entity';
import { SecretariatAssessment } from './secretariat_assessment.entity';
import { Users } from '../users/users.entity';
import { PatientEwallet } from '../patients/patient_ewallet.entity';

@Injectable()
export class SecretariatsService {
  constructor(
    @InjectRepository(Secretariats)
    private secretariatsRepository: Repository<Secretariats>,

   
    @InjectRepository(Patients)
    private patientsRepository: Repository<Patients>,
  
    @InjectRepository(SecretariatAssessment)
    private secretariatAssessmentRepository: Repository<SecretariatAssessment>,

    @InjectRepository(PatientEwallet)
    private patientEwalletRepository: Repository<PatientEwallet>,

   
  ) {}

//   findAll(): Promise<Patients[]> {
//     return this.patientsRepository.find();
// }

// Get all patients assigned to the logged-in MDT
async findAllPatients(req): Promise<Patients[]> {
  // const mdtUserId = req.user.userId; // Access the logged-in user's ID

  // Fetch the CMD's hospital
  // const mdt = await this.mdtsRepository.findOne({
  //     where: { user: mdtUserId },
  //     relations: ['hospital'],
  //     select: { hospital: { hospitalId: true } },
  // });

  // if (!mdt || !mdt.hospital) {
  //     throw new NotFoundException('CMD or MDT hospital not found');
  // }

  // Retrieve all patients in the same hospital as the CMD
  return await this.patientsRepository.find({
      // where: { hospital: { hospitalId: mdt.hospital.hospitalId } },
      relations: ['user', 'cancer', 'hospital', 'mdtAssessment', 'socialWorkerAssessment', 'socialCondition', 'carePlans'],
      select: {
          user: { userId: true, email: true, phoneNumber: true },
          cancer: { cancerName: true },
          hospital: { hospitalName: true, hospitalShortName: true },
      },
  });
}

// async findAllPatients(req): Promise<Patients[]> {
//   const secretariatUserId = req.user.userId; // Access the logged-in user's ID

//   // Fetch the SECRETARIAT's hospital
//   const secretariat = await this.secretariatsRepository.findOne({
//       where: { user: secretariatUserId },
//       relations: ['hospital'],
//       select: { hospital: { hospitalId: true } },
//   });

//   if (!secretariat || !secretariat.hospital) {
//       throw new NotFoundException('SECRETARIAT or SECRETARIAT hospital not found');
//   }

//   // Retrieve all patients in the same hospital as the SECRETARIAT
//   return await this.patientsRepository.find({
//       where: { hospital: { hospitalId: secretariat.hospital.hospitalId } },
//       relations: ['user', 'cancer', 'hospital', 'mdtAssessment', 'socialWorkerAssessment', 'socialCondition', 'carePlans'],
//       select: {
//           user: { userId: true, email: true, phoneNumber: true },
//           cancer: { cancerName: true },
//           hospital: { hospitalName: true, hospitalShortName: true },
//       },
//   });
// }




  // COME BACK TO THESE TWO CODES LATER FOR NOW PULL ALL PATIENTS IRRESPECTIVE OF HOSPITALS

//   async getHospitalIdByUserId(userId: number): Promise<number | undefined> {
//     const secretariat = await this.secretariatsRepository.findOne({
//         where: { user: { userId } }, // Assuming the relation to Users is set correctly
//         relations: ['hospital'], // Load the hospital relation
//     });

//     return secretariat?.hospital?.hospitalId; // Return hospitalId or undefined if not found
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

  
  


  findOne(secretariatId: number): Promise<Secretariats> {
    return this.secretariatsRepository.findOne({ where: { secretariatId }});
  }

  create(secretariats: Secretariats): Promise<Secretariats> {
    return this.secretariatsRepository.save(secretariats);
  }

  
//   async createSecretariatAssessment(
//     secretariatId: number, 
//     patientId: number, 
//     isApproved: string,
//     recommendationData: Partial<SecretariatAssessment>
// ): Promise<SecretariatAssessment> {
//     // Step 1: Create a new care plan
//     const newRecommendation = this.secretariatAssessmentRepository.create({
//         ...recommendationData,
//         secretariatId: { userId: secretariatId },  // Assign doctor by ID
//         patient: { userId: patientId },  // Assign patient by ID
//         isApproved
//     });
//     await this.secretariatAssessmentRepository.save(newRecommendation);
    
//     // Step 2: Update the patient
//     const patient = await this.patientsRepository.findOne({ where: { user: { userId: patientId } } });
//     if (!patient) {
//         throw new Error('Patient not found');
//     }

//     patient.applicationStage = "secretariat_reviewed";
//     patient.isSecretariatReviewed = "yes";
//     await this.patientsRepository.save(patient);

//     return newRecommendation;
// }


async createSecretariatAssessment(
  secretariatId: number, 
  patient: number, 
  isApproved: string,
  recommendationData: Partial<SecretariatAssessment>
): Promise<SecretariatAssessment> {
  // Step 1: Create a new care plan
  const patientQ = await this.patientsRepository.findOne({  where: { user: { userId: patient } } });
  
  if (!patientQ) {
      throw new Error('Patient not found');
  }

  const newRecommendation = this.secretariatAssessmentRepository.create({
      ...recommendationData,
      secretariatId: { userId: secretariatId },  // Assign doctor by ID
      // patient,  // Assign the full patient entity
      // isApproved
  });

  await this.secretariatAssessmentRepository.save(newRecommendation);
  
  // // Step 2: Update the patient
  patientQ.applicationStage = "secretariat_reviewed";
  patientQ.isSecretariatReviewed = "yes";
  await this.patientsRepository.save(patientQ);

  const eWalletEntry = this.patientEwalletRepository.create({
    user: patientQ.user,  // Reference the full patient entity as a User
    credit: 10000,       // Credit amount
    status: 'credited',  // Status of the transaction
    processedBy:  { userId: secretariatId },  // User who processed the credit
});

await this.patientEwalletRepository.save(eWalletEntry);
  return newRecommendation;
}



// async creditPatientEwallet(patientId: number, creditAmount: number, creditedBy: string): Promise<PatientEwallet> {
//   // Step 1: Find the patient to ensure they exist
//   const patient = await this.patientsRepository.findOne({ where: { user: patientId } });
  
//   if (!patient) {
//       throw new Error('Patient not found');
//   }

//   // Step 2: Create a new e-wallet record
//   const eWalletEntry = this.patientEwalletRepository.create({
//       user: patient, // Assign the full patient entity
//       credit: creditAmount,
//       status: 'credited',
//       creditedBy, // Can be the user's ID or name
//   });

//   // Step 3: Save the new e-wallet record
//   await this.patientEwalletRepository.save(eWalletEntry);

//   return eWalletEntry;
// }


    async changePatientStatus(
      userId: number, // ID of the logged-in patient (user)
      approvalData: Partial<SecretariatAssessment>,
      patientId: number,
    ): Promise<SecretariatAssessment> {
      
      // Update the assessment status
      await this.secretariatAssessmentRepository.update(
        { patient: { userId } },  
        { ...approvalData } 
      );
  
     
  
      await this.patientsRepository.update(
        { user: {userId: patientId }}, 
        { 
          applicationStage: "secretariat_reviewed",
          isSecretariatReviewed: "yes" 
      }
    );
    
      // Fetch the updated assessment
      const updatedAssessment = await this.secretariatAssessmentRepository.findOne({
        where: { patient: { userId } } // Adjust the criteria based on your needs
      });
    
      // Check if the updatedAssessment was found
      if (!updatedAssessment) {
        throw new Error(`Assessment for user ID ${userId} not found`);
      }
    
      return updatedAssessment; 
    }
    
  
  // async changePatientStatus(
  //   userId: number, // ID of the logged-in patient (user)
  //   approvalData: Partial<SecretariatAssessment>
  // ): Promise<SecretariatAssessment> {
    
  //   // Update the assessment status
  //   await this.workerAssessmentRepository.update(
  //     { patient: { userId } },  
  //     { ...approvalData } 
  //   );

  //   await this.socialConditionRepository.update(
  //     { patient: { userId } },  
  //     { ...approvalData } 
  //   );
  
  //   // Fetch the updated assessment
  //   const updatedAssessment = await this.workerAssessmentRepository.findOne({
  //     where: { patient: { userId } } // Adjust the criteria based on your needs
  //   });
  
  //   // Check if the updatedAssessment was found
  //   if (!updatedAssessment) {
  //     throw new Error(`Assessment for user ID ${userId} not found`);
  //   }
  
  //   return updatedAssessment; 
  // }
  

  // async update(secretariatId: number, secretariats: Secretariats): Promise<Secretariats> {
  //   await this.secretariatsRepository.update(secretariatId, secretariats);
  //   return this.findOne(secretariatId);
  // }

  // async remove(secretariatId: string): Promise<void> {
  //   await this.secretariatsRepository.delete(secretariatId);
  // }
}
