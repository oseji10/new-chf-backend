import { MigrationInterface, QueryRunner } from "typeorm";

export class Fourth1730191525115 implements MigrationInterface {
    name = 'Fourth1730191525115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patients" ("chfId" SERIAL NOT NULL, "nin" character varying NOT NULL, "hospitalFileNumber" character varying, "firstName" character varying, "lastName" character varying, "otherNames" character varying, "userId" integer, "gender" character varying, "ethnicity" character varying, "maritalStatus" character varying, "numberOfChildren" character varying, "levelOfEducation" character varying, "religion" character varying, "occupation" character varying, "dateOfBirth" character varying, "applicationStage" character varying DEFAULT 'registering', "status" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "userUserId" integer, "primaryPhysicianUserId" integer, "stateOfOriginStateId" integer, "stateOfResidenceStateId" integer, "nextOfKinNokId" integer, "cancerCancerId" integer, "hospitalHospitalId" integer, CONSTRAINT "UQ_cc8636c9eb16333fdfa0c2eef35" UNIQUE ("nin"), CONSTRAINT "REL_d3a8dab892f9f1856fd55b7b7d" UNIQUE ("userUserId"), CONSTRAINT "REL_6617462424404c19b3de00ab31" UNIQUE ("primaryPhysicianUserId"), CONSTRAINT "REL_4dffee05a695175934641105ea" UNIQUE ("stateOfOriginStateId"), CONSTRAINT "REL_ca5e099d905ae3a88dd0b432e2" UNIQUE ("stateOfResidenceStateId"), CONSTRAINT "REL_22697cfdfee436a6b2ad6992ae" UNIQUE ("nextOfKinNokId"), CONSTRAINT "REL_b27f3ccc7c7b74a182bd42ebba" UNIQUE ("cancerCancerId"), CONSTRAINT "PK_b37fcc5786d76bf0e7b54765f98" PRIMARY KEY ("chfId"))`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_d3a8dab892f9f1856fd55b7b7dc" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_6617462424404c19b3de00ab31a" FOREIGN KEY ("primaryPhysicianUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_4dffee05a695175934641105eae" FOREIGN KEY ("stateOfOriginStateId") REFERENCES "states"("stateId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_ca5e099d905ae3a88dd0b432e25" FOREIGN KEY ("stateOfResidenceStateId") REFERENCES "states"("stateId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_22697cfdfee436a6b2ad6992ae7" FOREIGN KEY ("nextOfKinNokId") REFERENCES "patient_next_of_kin"("nokId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_b27f3ccc7c7b74a182bd42ebba0" FOREIGN KEY ("cancerCancerId") REFERENCES "cancers"("cancerId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_b851cc321468c00b07acb551462" FOREIGN KEY ("hospitalHospitalId") REFERENCES "hospitals"("hospitalId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD CONSTRAINT "FK_9321466502afd36ffe936b91e23" FOREIGN KEY ("chfIdChfId") REFERENCES "patients"("chfId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet_topup_request" ADD CONSTRAINT "FK_00cc4455ab0bc23c6acb33aa2fd" FOREIGN KEY ("chfIdChfId") REFERENCES "patients"("chfId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_ewallet_topup_request" DROP CONSTRAINT "FK_00cc4455ab0bc23c6acb33aa2fd"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP CONSTRAINT "FK_9321466502afd36ffe936b91e23"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_b851cc321468c00b07acb551462"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_b27f3ccc7c7b74a182bd42ebba0"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_22697cfdfee436a6b2ad6992ae7"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_ca5e099d905ae3a88dd0b432e25"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_4dffee05a695175934641105eae"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_6617462424404c19b3de00ab31a"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_d3a8dab892f9f1856fd55b7b7dc"`);
        await queryRunner.query(`DROP TABLE "patients"`);
    }

}
