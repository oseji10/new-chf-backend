import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mdts } from './mdt.entity';

import { Patients } from '../patients/patients.entity';
// // import { MdtAssessment } from '../patients/social_worker_assessment.entity';
// import { SocialCondition } from '../patients/social_condition.entity';
import { MdtAssessment } from './mdt_assessment.entity';

@Injectable()
export class MdtsService {
  constructor(
    @InjectRepository(Mdts)
    private mdtsRepository: Repository<Mdts>,

   
    @InjectRepository(Patients)
    private patientsRepository: Repository<Patients>,
  
    @InjectRepository(MdtAssessment)
    private mdtAssessmentRepository: Repository<MdtAssessment>,

    // @InjectRepository(SocialCondition)
    // private socialConditionRepository: Repository<SocialCondition>,

    
  ) {}

  findAll(): Promise<Mdts[]> {
    return this.mdtsRepository.find();
  }

   
  // Get all patients assigned to the logged-in mdt
  async findAllPatients(mdtId: number): Promise<Patients[]> {
    return await this.patientsRepository.find({
      where: { primaryPhysician: { userId: mdtId } },
      relations: ['user', 'cancer', 'hospital', 'carePlans'], 
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
        carePlans: {
          careId: true,
          careplan: true,
          cost: true,
          status: true,
          isApproved: true,
          comment: true
        }
      },
    });
  }


  // COME BACK TO THESE TWO CODES LATER FOR NOW PULL ALL PATIENTS IRRESPECTIVE OF HOSPITALS

//   async getHospitalIdByUserId(userId: number): Promise<number | undefined> {
//     const mdt = await this.mdtsRepository.findOne({
//         where: { user: { userId } }, // Assuming the relation to Users is set correctly
//         relations: ['hospital'], // Load the hospital relation
//     });

//     return mdt?.hospital?.hospitalId; // Return hospitalId or undefined if not found
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

  
  


  findOne(mdtId: number): Promise<Mdts> {
    return this.mdtsRepository.findOne({ where: { mdtId }});
  }

  create(mdts: Mdts): Promise<Mdts> {
    return this.mdtsRepository.save(mdts);
  }

  
  async createMdtAssessment(
    
      cmdId: number, 
      patientId: number, 
      recommendationData: Partial<MdtAssessment>
    ): Promise<MdtAssessment> {
        // Step 1: Create a new care plan
        const newRecommendation = this.mdtAssessmentRepository.create({
            ...recommendationData,
            cmdId: { userId: cmdId },  // Assign doctor by ID
            patient: { userId: patientId },  // Assign patient by ID
        });
        await this.mdtAssessmentRepository.save(newRecommendation);
    
        
        await this.patientsRepository.update(
            { user: {userId: patientId }}, 
            { 
              applicationStage: "mdt_reviewed",
              isMdtReviewed: "yes" 
          }
        );
    
        return newRecommendation;
    }




    async changePatientStatus(
      userId: number, // ID of the logged-in patient (user)
      approvalData: Partial<MdtAssessment>,
      patientId: number,
    ): Promise<MdtAssessment> {
      
      // Update the assessment status
      await this.mdtAssessmentRepository.update(
        { patient: { userId } },  
        { ...approvalData } 
      );
  
     
  
      await this.patientsRepository.update(
        { user: {userId: patientId }}, 
        { 
          applicationStage: "mdt_reviewed",
          isMdtReviewed: "yes" 
      }
    );
    
      // Fetch the updated assessment
      const updatedAssessment = await this.mdtAssessmentRepository.findOne({
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
  //   approvalData: Partial<MdtAssessment>
  // ): Promise<MdtAssessment> {
    
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
  

  // async update(mdtId: number, mdts: Mdts): Promise<Mdts> {
  //   await this.mdtsRepository.update(mdtId, mdts);
  //   return this.findOne(mdtId);
  // }

  // async remove(mdtId: string): Promise<void> {
  //   await this.mdtsRepository.delete(mdtId);
  // }
}
