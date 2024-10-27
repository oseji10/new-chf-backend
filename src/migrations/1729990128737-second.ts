import { MigrationInterface, QueryRunner } from "typeorm";

export class Second1729990128737 implements MigrationInterface {
    name = 'Second1729990128737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patients" ("chfId" SERIAL NOT NULL, "nin" character varying NOT NULL, "hospitalFileNumber" character varying, "firstName" character varying, "lastName" character varying, "otherNames" character varying, "primaryPhysician" character varying NOT NULL, "applicationStage" character varying DEFAULT 'registering', "status" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "userId" integer, CONSTRAINT "UQ_cc8636c9eb16333fdfa0c2eef35" UNIQUE ("nin"), CONSTRAINT "REL_2c24c3490a26d04b0d70f92057" UNIQUE ("userId"), CONSTRAINT "PK_b37fcc5786d76bf0e7b54765f98" PRIMARY KEY ("chfId"))`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_2c24c3490a26d04b0d70f92057a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_2c24c3490a26d04b0d70f92057a"`);
        await queryRunner.query(`DROP TABLE "patients"`);
    }

}
