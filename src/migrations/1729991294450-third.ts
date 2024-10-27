import { MigrationInterface, QueryRunner } from "typeorm";

export class Third1729991294450 implements MigrationInterface {
    name = 'Third1729991294450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient_personal_history" ("id" SERIAL NOT NULL, "averageMonthlyIncome" integer NOT NULL, "averageFeedingDaily" integer NOT NULL, "whoProvidesFeeding" character varying NOT NULL, "accomodation" character varying NOT NULL, "accomodationType" character varying NOT NULL, "numberOfGoodSetOfClothes" integer NOT NULL, "howAreClothesGotten" character varying NOT NULL, "hospitalReceivingCare" integer NOT NULL, "whyDidYouChooseHospital" character varying NOT NULL, "levelOfSpousalSupport" character varying NOT NULL, "otherSupport" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "chfIdChfId" integer, "updatedById" integer, CONSTRAINT "UQ_93165094da08307ee0031e781a7" UNIQUE ("averageMonthlyIncome"), CONSTRAINT "UQ_03288addf2281fed439ba6ae044" UNIQUE ("averageFeedingDaily"), CONSTRAINT "UQ_a8442cabe002943cee8fc40e10f" UNIQUE ("whoProvidesFeeding"), CONSTRAINT "UQ_f4ee267d27246f1a7c735fa709e" UNIQUE ("accomodation"), CONSTRAINT "UQ_c72bb65338ff8c8e6d8a5d8b3b7" UNIQUE ("accomodationType"), CONSTRAINT "UQ_eb1eb7d3d87a9bafd4c4c374574" UNIQUE ("numberOfGoodSetOfClothes"), CONSTRAINT "UQ_75b9b2025ac475c5a10d6231566" UNIQUE ("howAreClothesGotten"), CONSTRAINT "UQ_e827a972ea491ee201e0b587372" UNIQUE ("hospitalReceivingCare"), CONSTRAINT "UQ_1bc6f3cf60bba10a2e3ad3831f7" UNIQUE ("whyDidYouChooseHospital"), CONSTRAINT "UQ_eabb9a833d4cb69a2eda290d86a" UNIQUE ("levelOfSpousalSupport"), CONSTRAINT "UQ_0681a3e966a42065374403c7efb" UNIQUE ("otherSupport"), CONSTRAINT "REL_58bec69a5db2ab59ac9ab8b8b6" UNIQUE ("chfIdChfId"), CONSTRAINT "PK_ff2f265690c18baae013141425f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" ADD CONSTRAINT "FK_58bec69a5db2ab59ac9ab8b8b6a" FOREIGN KEY ("chfIdChfId") REFERENCES "patients"("chfId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" ADD CONSTRAINT "FK_a86dd62df7a1a462902256ad0c7" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_personal_history" DROP CONSTRAINT "FK_a86dd62df7a1a462902256ad0c7"`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" DROP CONSTRAINT "FK_58bec69a5db2ab59ac9ab8b8b6a"`);
        await queryRunner.query(`DROP TABLE "patient_personal_history"`);
    }

}
