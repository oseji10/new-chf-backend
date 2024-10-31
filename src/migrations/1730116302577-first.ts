import { MigrationInterface, QueryRunner } from "typeorm";

export class First1730116302577 implements MigrationInterface {
    name = 'First1730116302577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("roleId" SERIAL NOT NULL, "roleName" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_992f24b9d80eb1312440ca577f1" UNIQUE ("roleName"), CONSTRAINT "PK_39bf7e8af8fe54d9d1c7a8efe6f" PRIMARY KEY ("roleId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("userId" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying(11), "phoneNumber" character varying(11), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "regions" ("regionId" SERIAL NOT NULL, "shortName" character varying, "regionName" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_ef8f65f1b1345640a9a7a2b3941" PRIMARY KEY ("regionId"))`);
        await queryRunner.query(`CREATE TABLE "states" ("stateId" SERIAL NOT NULL, "stateName" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "regionRegionId" integer, CONSTRAINT "PK_e54e3519e287181c0398c7667ab" PRIMARY KEY ("stateId"))`);
        await queryRunner.query(`CREATE TABLE "patient_next_of_kin" ("nokId" SERIAL NOT NULL, "nextOfKinName" character varying, "nextOfKinPhoneNumber" character varying, "nextOfKinAlternatePhoneNumber" character varying, "relationship" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "userUserId" integer, "processedByUserId" integer, CONSTRAINT "REL_5b8f50f2d541536d5026cbb287" UNIQUE ("userUserId"), CONSTRAINT "PK_3396dcf2698ed0dbf3e4d2aaef7" PRIMARY KEY ("nokId"))`);
        await queryRunner.query(`CREATE TABLE "cancers" ("cancerId" SERIAL NOT NULL, "cancerName" character varying NOT NULL, "status" character varying DEFAULT 'active', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_dfff730e20a6f0e132ff0f48e29" PRIMARY KEY ("cancerId"))`);
        await queryRunner.query(`CREATE TABLE "hospitals" ("hospitalId" SERIAL NOT NULL, "hospitalName" character varying, "hospitalShortName" character varying, "hospitalAddress" character varying, "bankName" character varying, "accountName" character varying, "accountNumber" integer, "sortCode" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "stateStateId" integer, CONSTRAINT "PK_f97e88e5aef1dd226733b1f7108" PRIMARY KEY ("hospitalId"))`);
        await queryRunner.query(`CREATE TABLE "patients" ("chfId" SERIAL NOT NULL, "nin" character varying NOT NULL, "hospitalFileNumber" character varying, "firstName" character varying, "lastName" character varying, "otherNames" character varying, "userId" integer, "gender" character varying, "ethnicity" character varying, "maritalStatus" character varying, "numberOfChildren" character varying, "levelOfEducation" character varying, "religion" character varying, "occupation" character varying, "dateOfBirth" character varying, "applicationStage" character varying DEFAULT 'registering', "status" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "userUserId" integer, "primaryPhysicianUserId" integer, "stateOfOriginStateId" integer, "stateOfResidenceStateId" integer, "nextOfKinNokId" integer, "cancerCancerId" integer, "hospitalHospitalId" integer, CONSTRAINT "UQ_cc8636c9eb16333fdfa0c2eef35" UNIQUE ("nin"), CONSTRAINT "REL_d3a8dab892f9f1856fd55b7b7d" UNIQUE ("userUserId"), CONSTRAINT "REL_6617462424404c19b3de00ab31" UNIQUE ("primaryPhysicianUserId"), CONSTRAINT "REL_4dffee05a695175934641105ea" UNIQUE ("stateOfOriginStateId"), CONSTRAINT "REL_ca5e099d905ae3a88dd0b432e2" UNIQUE ("stateOfResidenceStateId"), CONSTRAINT "REL_22697cfdfee436a6b2ad6992ae" UNIQUE ("nextOfKinNokId"), CONSTRAINT "REL_b27f3ccc7c7b74a182bd42ebba" UNIQUE ("cancerCancerId"), CONSTRAINT "PK_b37fcc5786d76bf0e7b54765f98" PRIMARY KEY ("chfId"))`);
        await queryRunner.query(`CREATE TABLE "patient_personal_history" ("id" SERIAL NOT NULL, "averageMonthlyIncome" numeric NOT NULL, "averageFeedingDaily" integer, "whoProvidesFeeding" character varying, "accomodation" character varying, "accomodationType" character varying, "numberOfGoodSetOfClothes" integer, "howAreClothesGotten" character varying, "hospitalReceivingCare" character varying, "whyDidYouChooseHospital" character varying, "levelOfSpousalSupport" character varying, "otherSupport" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "userUserId" integer, "updatedByUserId" integer, CONSTRAINT "UQ_93165094da08307ee0031e781a7" UNIQUE ("averageMonthlyIncome"), CONSTRAINT "REL_cf71f05d9733198ca15968cf30" UNIQUE ("userUserId"), CONSTRAINT "PK_ff2f265690c18baae013141425f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient_family_history" ("id" SERIAL NOT NULL, "familySetup" character varying, "familiySize" integer, "birthOrder" character varying, "fatherEducationalLevel" character varying, "motherEducationalLevel" character varying, "fatherOccupation" character varying, "motherOccupation" character varying, "levelOfFamilyCare" character varying, "familyMonthlyIncome" numeric NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "userUserId" integer, "updatedByUserId" integer, CONSTRAINT "UQ_24013299e57aa7e94e09b2fb5da" UNIQUE ("familyMonthlyIncome"), CONSTRAINT "REL_8829dd17612c50410f5ac68d86" UNIQUE ("userUserId"), CONSTRAINT "PK_d1300bafd9a62511c1653fd962c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient_ewallet_topup_request" ("id" SERIAL NOT NULL, "amountRequested" numeric, "amountCredited" numeric, "debit" numeric, "requesterComment" character varying, "approverComment" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "chfIdChfId" integer, "requestedByUserId" integer, "approvedByUserId" integer, "creditedByUserId" integer, CONSTRAINT "REL_00cc4455ab0bc23c6acb33aa2f" UNIQUE ("chfIdChfId"), CONSTRAINT "PK_17e7bc008a173d7b63e2d17a8ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient_ewallet" ("id" SERIAL NOT NULL, "credit" numeric, "debit" numeric, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "chfIdChfId" integer, "processedByUserId" integer, CONSTRAINT "REL_9321466502afd36ffe936b91e2" UNIQUE ("chfIdChfId"), CONSTRAINT "PK_9c2ef5aae86b8428407ab766ba1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hospital_ewallet" ("id" SERIAL NOT NULL, "credit" numeric NOT NULL, "debit" numeric NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "hospitalHospitalId" integer, "processedByUserId" integer, CONSTRAINT "UQ_0567da7589df36d346e8ae1721e" UNIQUE ("credit"), CONSTRAINT "UQ_a8bed295f505dbfcf754ff1d6eb" UNIQUE ("debit"), CONSTRAINT "REL_72bbfee2d767c7629fce600dc9" UNIQUE ("hospitalHospitalId"), CONSTRAINT "PK_26b2284ec97bfa9b66f4ca55a1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctors" ("doctorId" SERIAL NOT NULL, "doctorName" character varying NOT NULL, "title" character varying NOT NULL, "department" character varying NOT NULL, "status" character varying DEFAULT 'active', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "hospitalHospitalId" integer, "userUserId" integer, CONSTRAINT "REL_7170fa108adef3f2cd91d3453d" UNIQUE ("userUserId"), CONSTRAINT "PK_059971ad86db9f4acff1ef31ac2" PRIMARY KEY ("doctorId"))`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_88481b0c4ed9ada47e9fdd67475" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "user_roles" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_86033897c009fcca8b6505d6be" ON "user_roles" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "states" ADD CONSTRAINT "FK_f37b4d5e784330f48f522f9e9c2" FOREIGN KEY ("regionRegionId") REFERENCES "regions"("regionId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_next_of_kin" ADD CONSTRAINT "FK_5b8f50f2d541536d5026cbb2879" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_next_of_kin" ADD CONSTRAINT "FK_570e91cdfd286a76546272cacf2" FOREIGN KEY ("processedByUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hospitals" ADD CONSTRAINT "FK_d6775fd2114c3b61e1b99a2f4aa" FOREIGN KEY ("stateStateId") REFERENCES "states"("stateId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_d3a8dab892f9f1856fd55b7b7dc" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_6617462424404c19b3de00ab31a" FOREIGN KEY ("primaryPhysicianUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_4dffee05a695175934641105eae" FOREIGN KEY ("stateOfOriginStateId") REFERENCES "states"("stateId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_ca5e099d905ae3a88dd0b432e25" FOREIGN KEY ("stateOfResidenceStateId") REFERENCES "states"("stateId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_22697cfdfee436a6b2ad6992ae7" FOREIGN KEY ("nextOfKinNokId") REFERENCES "patient_next_of_kin"("nokId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_b27f3ccc7c7b74a182bd42ebba0" FOREIGN KEY ("cancerCancerId") REFERENCES "cancers"("cancerId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_b851cc321468c00b07acb551462" FOREIGN KEY ("hospitalHospitalId") REFERENCES "hospitals"("hospitalId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" ADD CONSTRAINT "FK_cf71f05d9733198ca15968cf300" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" ADD CONSTRAINT "FK_f0d79010a261efb6a3141899a20" FOREIGN KEY ("updatedByUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" ADD CONSTRAINT "FK_8829dd17612c50410f5ac68d86b" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" ADD CONSTRAINT "FK_a874ff16cd45e8656c0fbfa15ec" FOREIGN KEY ("updatedByUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet_topup_request" ADD CONSTRAINT "FK_00cc4455ab0bc23c6acb33aa2fd" FOREIGN KEY ("chfIdChfId") REFERENCES "patients"("chfId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet_topup_request" ADD CONSTRAINT "FK_2fc5ebd1a7ed2dbf4181b78f5fd" FOREIGN KEY ("requestedByUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet_topup_request" ADD CONSTRAINT "FK_3a35a77ff720985f5f43decc968" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet_topup_request" ADD CONSTRAINT "FK_8f21e16e64d86b8366acedd639d" FOREIGN KEY ("creditedByUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD CONSTRAINT "FK_9321466502afd36ffe936b91e23" FOREIGN KEY ("chfIdChfId") REFERENCES "patients"("chfId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD CONSTRAINT "FK_4d6e508bb827009b7b1dbe458a7" FOREIGN KEY ("processedByUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hospital_ewallet" ADD CONSTRAINT "FK_72bbfee2d767c7629fce600dc9f" FOREIGN KEY ("hospitalHospitalId") REFERENCES "hospitals"("hospitalId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hospital_ewallet" ADD CONSTRAINT "FK_06a655f4acd640a566510d8dd6d" FOREIGN KEY ("processedByUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "FK_9d4f90c912e34ee4362cc9e0c37" FOREIGN KEY ("hospitalHospitalId") REFERENCES "hospitals"("hospitalId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "FK_7170fa108adef3f2cd91d3453d4" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES "roles"("roleId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "FK_7170fa108adef3f2cd91d3453d4"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "FK_9d4f90c912e34ee4362cc9e0c37"`);
        await queryRunner.query(`ALTER TABLE "hospital_ewallet" DROP CONSTRAINT "FK_06a655f4acd640a566510d8dd6d"`);
        await queryRunner.query(`ALTER TABLE "hospital_ewallet" DROP CONSTRAINT "FK_72bbfee2d767c7629fce600dc9f"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP CONSTRAINT "FK_4d6e508bb827009b7b1dbe458a7"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP CONSTRAINT "FK_9321466502afd36ffe936b91e23"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet_topup_request" DROP CONSTRAINT "FK_8f21e16e64d86b8366acedd639d"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet_topup_request" DROP CONSTRAINT "FK_3a35a77ff720985f5f43decc968"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet_topup_request" DROP CONSTRAINT "FK_2fc5ebd1a7ed2dbf4181b78f5fd"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet_topup_request" DROP CONSTRAINT "FK_00cc4455ab0bc23c6acb33aa2fd"`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" DROP CONSTRAINT "FK_a874ff16cd45e8656c0fbfa15ec"`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" DROP CONSTRAINT "FK_8829dd17612c50410f5ac68d86b"`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" DROP CONSTRAINT "FK_f0d79010a261efb6a3141899a20"`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" DROP CONSTRAINT "FK_cf71f05d9733198ca15968cf300"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_b851cc321468c00b07acb551462"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_b27f3ccc7c7b74a182bd42ebba0"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_22697cfdfee436a6b2ad6992ae7"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_ca5e099d905ae3a88dd0b432e25"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_4dffee05a695175934641105eae"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_6617462424404c19b3de00ab31a"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_d3a8dab892f9f1856fd55b7b7dc"`);
        await queryRunner.query(`ALTER TABLE "hospitals" DROP CONSTRAINT "FK_d6775fd2114c3b61e1b99a2f4aa"`);
        await queryRunner.query(`ALTER TABLE "patient_next_of_kin" DROP CONSTRAINT "FK_570e91cdfd286a76546272cacf2"`);
        await queryRunner.query(`ALTER TABLE "patient_next_of_kin" DROP CONSTRAINT "FK_5b8f50f2d541536d5026cbb2879"`);
        await queryRunner.query(`ALTER TABLE "states" DROP CONSTRAINT "FK_f37b4d5e784330f48f522f9e9c2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_86033897c009fcca8b6505d6be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_472b25323af01488f1f66a06b6"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TABLE "doctors"`);
        await queryRunner.query(`DROP TABLE "hospital_ewallet"`);
        await queryRunner.query(`DROP TABLE "patient_ewallet"`);
        await queryRunner.query(`DROP TABLE "patient_ewallet_topup_request"`);
        await queryRunner.query(`DROP TABLE "patient_family_history"`);
        await queryRunner.query(`DROP TABLE "patient_personal_history"`);
        await queryRunner.query(`DROP TABLE "patients"`);
        await queryRunner.query(`DROP TABLE "hospitals"`);
        await queryRunner.query(`DROP TABLE "cancers"`);
        await queryRunner.query(`DROP TABLE "patient_next_of_kin"`);
        await queryRunner.query(`DROP TABLE "states"`);
        await queryRunner.query(`DROP TABLE "regions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
