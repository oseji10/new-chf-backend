import { MigrationInterface, QueryRunner } from "typeorm";

export class Fourthw1730192148349 implements MigrationInterface {
    name = 'Fourthw1730192148349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patients" ("chfId" SERIAL NOT NULL, "nin" character varying NOT NULL, "hospitalFileNumber" character varying, "firstName" character varying, "lastName" character varying, "otherNames" character varying, "gender" character varying, "ethnicity" character varying, "maritalStatus" character varying, "numberOfChildren" character varying, "levelOfEducation" character varying, "religion" character varying, "occupation" character varying, "dateOfBirth" character varying, "applicationStage" character varying DEFAULT 'registering', "status" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_cc8636c9eb16333fdfa0c2eef35" UNIQUE ("nin"), CONSTRAINT "PK_b37fcc5786d76bf0e7b54765f98" PRIMARY KEY ("chfId"))`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet_topup_request" ADD CONSTRAINT "FK_00cc4455ab0bc23c6acb33aa2fd" FOREIGN KEY ("chfIdChfId") REFERENCES "patients"("chfId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD CONSTRAINT "FK_9321466502afd36ffe936b91e23" FOREIGN KEY ("chfIdChfId") REFERENCES "patients"("chfId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP CONSTRAINT "FK_9321466502afd36ffe936b91e23"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet_topup_request" DROP CONSTRAINT "FK_00cc4455ab0bc23c6acb33aa2fd"`);
        await queryRunner.query(`DROP TABLE "patients"`);
    }

}
