import { MigrationInterface, QueryRunner } from "typeorm";

export class Six1730652463337 implements MigrationInterface {
    name = 'Six1730652463337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mdt_assessment" ("assesmentId" SERIAL NOT NULL, "recommendations" character varying, "cost" character varying NOT NULL, "status" character varying DEFAULT 'active', "isApproved" character varying, "comment" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "doctorId" integer, "patientId" integer, "updatedByUserId" integer, CONSTRAINT "PK_28a90ec8ea14ed97506570c40f3" PRIMARY KEY ("assesmentId"))`);
        await queryRunner.query(`CREATE TABLE "patients" ("id" SERIAL NOT NULL, "nchfId" character varying NOT NULL, "nin" character varying NOT NULL, "hospitalFileNumber" character varying, "firstName" character varying, "lastName" character varying, "otherNames" character varying, "gender" character varying, "ethnicity" character varying, "maritalStatus" character varying, "numberOfChildren" character varying, "levelOfEducation" character varying, "religion" character varying, "occupation" character varying, "dateOfBirth" character varying, "applicationStage" character varying DEFAULT 'biodata', "status" character varying, "cancerStage" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "profileCompletionPercentage" character varying, "isPrimaryPhysicianReviewed" character varying DEFAULT 'no', "isSocialWorkerReviewed" character varying DEFAULT 'no', "isMdtReviewed" character varying DEFAULT 'no', "isCmdReviewed" character varying DEFAULT 'no', "isSecretariatReviewed" character varying DEFAULT 'no', "userId" integer, "primaryPhysicianUserId" integer, "stateOfOriginStateId" integer, "stateOfResidenceStateId" integer, "cancerCancerId" integer, "hospitalHospitalId" integer, CONSTRAINT "UQ_6d9b8f12771c199db11ff11eb75" UNIQUE ("nchfId"), CONSTRAINT "UQ_cc8636c9eb16333fdfa0c2eef35" UNIQUE ("nin"), CONSTRAINT "REL_2c24c3490a26d04b0d70f92057" UNIQUE ("userId"), CONSTRAINT "REL_6617462424404c19b3de00ab31" UNIQUE ("primaryPhysicianUserId"), CONSTRAINT "REL_4dffee05a695175934641105ea" UNIQUE ("stateOfOriginStateId"), CONSTRAINT "REL_ca5e099d905ae3a88dd0b432e2" UNIQUE ("stateOfResidenceStateId"), CONSTRAINT "REL_b27f3ccc7c7b74a182bd42ebba" UNIQUE ("cancerCancerId"), CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mdt_assessment" ADD CONSTRAINT "FK_9a6aab4009d643876c237bb0443" FOREIGN KEY ("doctorId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mdt_assessment" ADD CONSTRAINT "FK_5b9c647f8d470b64dbc4cba2840" FOREIGN KEY ("patientId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mdt_assessment" ADD CONSTRAINT "FK_b771347951f954d5528bd215ba8" FOREIGN KEY ("updatedByUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_2c24c3490a26d04b0d70f92057a" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_6617462424404c19b3de00ab31a" FOREIGN KEY ("primaryPhysicianUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_4dffee05a695175934641105eae" FOREIGN KEY ("stateOfOriginStateId") REFERENCES "states"("stateId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_ca5e099d905ae3a88dd0b432e25" FOREIGN KEY ("stateOfResidenceStateId") REFERENCES "states"("stateId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_b27f3ccc7c7b74a182bd42ebba0" FOREIGN KEY ("cancerCancerId") REFERENCES "cancers"("cancerId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_b851cc321468c00b07acb551462" FOREIGN KEY ("hospitalHospitalId") REFERENCES "hospitals"("hospitalId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet_topup_request" ADD CONSTRAINT "FK_d254445cfaf080efdd5e36bbb13" FOREIGN KEY ("chfIdId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD CONSTRAINT "FK_3884155f5412acdfe5488842c45" FOREIGN KEY ("chfIdId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP CONSTRAINT "FK_3884155f5412acdfe5488842c45"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet_topup_request" DROP CONSTRAINT "FK_d254445cfaf080efdd5e36bbb13"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_b851cc321468c00b07acb551462"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_b27f3ccc7c7b74a182bd42ebba0"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_ca5e099d905ae3a88dd0b432e25"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_4dffee05a695175934641105eae"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_6617462424404c19b3de00ab31a"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_2c24c3490a26d04b0d70f92057a"`);
        await queryRunner.query(`ALTER TABLE "mdt_assessment" DROP CONSTRAINT "FK_b771347951f954d5528bd215ba8"`);
        await queryRunner.query(`ALTER TABLE "mdt_assessment" DROP CONSTRAINT "FK_5b9c647f8d470b64dbc4cba2840"`);
        await queryRunner.query(`ALTER TABLE "mdt_assessment" DROP CONSTRAINT "FK_9a6aab4009d643876c237bb0443"`);
        await queryRunner.query(`DROP TABLE "patients"`);
        await queryRunner.query(`DROP TABLE "mdt_assessment"`);
    }

}
