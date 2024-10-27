import { MigrationInterface, QueryRunner } from "typeorm";

export class Third1729994962707 implements MigrationInterface {
    name = 'Third1729994962707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cancers" ("cancerId" uuid NOT NULL DEFAULT uuid_generate_v4(), "cancerName" character varying NOT NULL, "status" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_dfff730e20a6f0e132ff0f48e29" PRIMARY KEY ("cancerId"))`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "cancerCancerId" uuid`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "UQ_b27f3ccc7c7b74a182bd42ebba0" UNIQUE ("cancerCancerId")`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_b27f3ccc7c7b74a182bd42ebba0" FOREIGN KEY ("cancerCancerId") REFERENCES "cancers"("cancerId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_b27f3ccc7c7b74a182bd42ebba0"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "UQ_b27f3ccc7c7b74a182bd42ebba0"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "cancerCancerId"`);
        await queryRunner.query(`DROP TABLE "cancers"`);
    }

}
