import { MigrationInterface, QueryRunner } from "typeorm";

export class Third1729992942888 implements MigrationInterface {
    name = 'Third1729992942888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP CONSTRAINT "FK_e5dd121e44733d4388611ead9ab"`);
        await queryRunner.query(`CREATE TABLE "hospital_ewallet" ("id" SERIAL NOT NULL, "credit" numeric NOT NULL, "debit" numeric NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "hospitalHospitalId" integer, "processedById" integer, CONSTRAINT "UQ_0567da7589df36d346e8ae1721e" UNIQUE ("credit"), CONSTRAINT "UQ_a8bed295f505dbfcf754ff1d6eb" UNIQUE ("debit"), CONSTRAINT "REL_72bbfee2d767c7629fce600dc9" UNIQUE ("hospitalHospitalId"), CONSTRAINT "PK_26b2284ec97bfa9b66f4ca55a1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP CONSTRAINT "UQ_e5dd121e44733d4388611ead9ab"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP COLUMN "hospitalHospitalId"`);
        await queryRunner.query(`ALTER TABLE "hospital_ewallet" ADD CONSTRAINT "FK_72bbfee2d767c7629fce600dc9f" FOREIGN KEY ("hospitalHospitalId") REFERENCES "hospitals"("hospitalId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hospital_ewallet" ADD CONSTRAINT "FK_8209065692294d3c230b4aa0cac" FOREIGN KEY ("processedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hospital_ewallet" DROP CONSTRAINT "FK_8209065692294d3c230b4aa0cac"`);
        await queryRunner.query(`ALTER TABLE "hospital_ewallet" DROP CONSTRAINT "FK_72bbfee2d767c7629fce600dc9f"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD "hospitalHospitalId" integer`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD CONSTRAINT "UQ_e5dd121e44733d4388611ead9ab" UNIQUE ("hospitalHospitalId")`);
        await queryRunner.query(`DROP TABLE "hospital_ewallet"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD CONSTRAINT "FK_e5dd121e44733d4388611ead9ab" FOREIGN KEY ("hospitalHospitalId") REFERENCES "hospitals"("hospitalId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
