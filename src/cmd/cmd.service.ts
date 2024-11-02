import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cmds } from './cmd.entity';

import { Patients } from '../patients/patients.entity';
// // import { CmdAssessment } from '../patients/social_worker_assessment.entity';
// import { SocialCondition } from '../patients/social_condition.entity';
import { CmdAssessment } from './cmd_assessment.entity';
import { Users } from '../users/users.entity';

@Injectable()
export class CmdsService {
  constructor(
    @InjectRepository(Cmds)
    private cmdsRepository: Repository<Cmds>,

   
    @InjectRepository(Patients)
    private patientsRepository: Repository<Patients>,
  
    @InjectRepository(CmdAssessment)
    private cmdAssessmentRepository: Repository<CmdAssessment>,

    // @InjectRepository(Users)
    // private usersRepository: Repository<Users>,

    // @InjectRepository(SocialCondition)
    // private socialConditionRepository: Repository<SocialCondition>,

    
  ) {}

  findAll(): Promise<Cmds[]> {
    return this.cmdsRepository.find();
  }

   
// Get all patients assigned to the logged-in CMD
// Get all patients assigned to the logged-in CMD
async findAllPatients(req): Promise<Patients[]> {
  const cmdUserId = req.user.userId; // Access the logged-in user's ID

  // Fetch the CMD's hospital
  const cmd = await this.cmdsRepository.findOne({
      where: { user: cmdUserId },
      relations: ['hospital'],
      select: { hospital: { hospitalId: true } },
  });

  if (!cmd || !cmd.hospital) {
      throw new NotFoundException('CMD or CMD hospital not found');
  }

  // Retrieve all patients in the same hospital as the CMD
  return await this.patientsRepository.find({
      where: { hospital: { hospitalId: cmd.hospital.hospitalId } },
      relations: ['user', 'cancer', 'hospital', 'mdtAssessment', 'socialWorkerAssessment', 'socialCondition'],
      select: {
          user: { userId: true, email: true, phoneNumber: true },
          cancer: { cancerName: true },
          hospital: { hospitalName: true, hospitalShortName: true },
      },
  });
}




  // COME BACK TO THESE TWO CODES LATER FOR NOW PULL ALL PATIENTS IRRESPECTIVE OF HOSPITALS

//   async getHospitalIdByUserId(userId: number): Promise<number | undefined> {
//     const cmd = await this.cmdsRepository.findOne({
//         where: { user: { userId } }, // Assuming the relation to Users is set correctly
//         relations: ['hospital'], // Load the hospital relation
//     });

//     return cmd?.hospital?.hospitalId; // Return hospitalId or undefined if not found
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

  
  


  findOne(cmdId: number): Promise<Cmds> {
    return this.cmdsRepository.findOne({ where: { cmdId }});
  }

  create(cmds: Cmds): Promise<Cmds> {
    return this.cmdsRepository.save(cmds);
  }

  
//   async createCmdAssessment(
//     cmdId: number, 
//     patientId: number, 
//     isApproved: string,
//     recommendationData: Partial<CmdAssessment>
// ): Promise<CmdAssessment> {
//     // Step 1: Create a new care plan
//     const newRecommendation = this.cmdAssessmentRepository.create({
//         ...recommendationData,
//         cmdId: { userId: cmdId },  // Assign doctor by ID
//         patient: { userId: patientId },  // Assign patient by ID
//         isApproved
//     });
//     await this.cmdAssessmentRepository.save(newRecommendation);
    
//     // Step 2: Update the patient
//     const patient = await this.patientsRepository.findOne({ where: { user: { userId: patientId } } });
//     if (!patient) {
//         throw new Error('Patient not found');
//     }

//     patient.applicationStage = "cmd_reviewed";
//     patient.isCmdReviewed = "yes";
//     await this.patientsRepository.save(patient);

//     return newRecommendation;
// }


async createCmdAssessment(
  cmdId: number, 
  patientId: number, 
  isApproved: string,
  recommendationData: Partial<CmdAssessment>
): Promise<CmdAssessment> {
  // Step 1: Create a new care plan
  const patient = await this.patientsRepository.findOne({  where: { user: { userId: patientId } } });
  
  if (!patient) {
      throw new Error('Patient not found');
  }

  const newRecommendation = this.cmdAssessmentRepository.create({
      ...recommendationData,
      cmdId: { userId: cmdId },  // Assign doctor by ID
      patient,  // Assign the full patient entity
      isApproved
  });

  await this.cmdAssessmentRepository.save(newRecommendation);
  
  // Step 2: Update the patient
  patient.applicationStage = "cmd_reviewed";
  patient.isCmdReviewed = "yes";
  await this.patientsRepository.save(patient);

  return newRecommendation;
}




    async changePatientStatus(
      userId: number, // ID of the logged-in patient (user)
      approvalData: Partial<CmdAssessment>,
      patientId: number,
    ): Promise<CmdAssessment> {
      
      // Update the assessment status
      await this.cmdAssessmentRepository.update(
        { patient: { userId } },  
        { ...approvalData } 
      );
  
     
  
      await this.patientsRepository.update(
        { user: {userId: patientId }}, 
        { 
          applicationStage: "cmd_reviewed",
          isCmdReviewed: "yes" 
      }
    );
    
      // Fetch the updated assessment
      const updatedAssessment = await this.cmdAssessmentRepository.findOne({
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
  //   approvalData: Partial<CmdAssessment>
  // ): Promise<CmdAssessment> {
    
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
  

  // async update(cmdId: number, cmds: Cmds): Promise<Cmds> {
  //   await this.cmdsRepository.update(cmdId, cmds);
  //   return this.findOne(cmdId);
  // }

  // async remove(cmdId: string): Promise<void> {
  //   await this.cmdsRepository.delete(cmdId);
  // }
}
