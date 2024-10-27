import { MigrationInterface, QueryRunner } from "typeorm";

export class Third1729992882136 implements MigrationInterface {
    name = 'Third1729992882136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient_ewallet" ("id" SERIAL NOT NULL, "credit" numeric NOT NULL, "debit" numeric NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "chfIdChfId" integer, "processedById" integer, CONSTRAINT "UQ_cb259bd06a4efc26e481775e25f" UNIQUE ("credit"), CONSTRAINT "UQ_689dbced8feb6437881e78f9865" UNIQUE ("debit"), CONSTRAINT "REL_9321466502afd36ffe936b91e2" UNIQUE ("chfIdChfId"), CONSTRAINT "PK_9c2ef5aae86b8428407ab766ba1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hospitals" ("hospitalId" SERIAL NOT NULL, "hospitalName" character varying NOT NULL, "hospitalShortName" character varying NOT NULL, "hospitalAddress" character varying NOT NULL, "bankName" character varying NOT NULL, "accountName" character varying NOT NULL, "accountNumber" integer NOT NULL, "sortCode" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "cmdId" integer, "hospitalAdminId" integer, CONSTRAINT "UQ_47bf02e969e8ca283e5ce97e084" UNIQUE ("hospitalName"), CONSTRAINT "UQ_6cfea7c95908a57d1ee50057541" UNIQUE ("hospitalShortName"), CONSTRAINT "UQ_b7f075230f49bef83e4abbd1608" UNIQUE ("hospitalAddress"), CONSTRAINT "UQ_82e4f297a424e390c1d7d94774e" UNIQUE ("bankName"), CONSTRAINT "UQ_d69235d30db819396d3f702ccf5" UNIQUE ("accountName"), CONSTRAINT "UQ_268df3a56043059f9d1e70045c3" UNIQUE ("accountNumber"), CONSTRAINT "UQ_b21da71e59a87b89d52a4627391" UNIQUE ("sortCode"), CONSTRAINT "REL_6f55f6d8c073bb27bf757c2bb1" UNIQUE ("cmdId"), CONSTRAINT "REL_a860bcad76ea98c58844d4cb74" UNIQUE ("hospitalAdminId"), CONSTRAINT "PK_f97e88e5aef1dd226733b1f7108" PRIMARY KEY ("hospitalId"))`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP CONSTRAINT "REL_9321466502afd36ffe936b91e2"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP COLUMN "chfIdChfId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD "chfIdChfId" integer`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD CONSTRAINT "UQ_9321466502afd36ffe936b91e23" UNIQUE ("chfIdChfId")`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD "hospitalHospitalId" integer`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD CONSTRAINT "UQ_e5dd121e44733d4388611ead9ab" UNIQUE ("hospitalHospitalId")`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" DROP CONSTRAINT "UQ_93165094da08307ee0031e781a7"`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" DROP COLUMN "averageMonthlyIncome"`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" ADD "averageMonthlyIncome" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" ADD CONSTRAINT "UQ_93165094da08307ee0031e781a7" UNIQUE ("averageMonthlyIncome")`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" DROP CONSTRAINT "UQ_24013299e57aa7e94e09b2fb5da"`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" DROP COLUMN "familyMonthlyIncome"`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" ADD "familyMonthlyIncome" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" ADD CONSTRAINT "UQ_24013299e57aa7e94e09b2fb5da" UNIQUE ("familyMonthlyIncome")`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD CONSTRAINT "FK_9321466502afd36ffe936b91e23" FOREIGN KEY ("chfIdChfId") REFERENCES "patients"("chfId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD CONSTRAINT "FK_ede538260353719cc4d4d048b7a" FOREIGN KEY ("processedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hospitals" ADD CONSTRAINT "FK_6f55f6d8c073bb27bf757c2bb11" FOREIGN KEY ("cmdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hospitals" ADD CONSTRAINT "FK_a860bcad76ea98c58844d4cb74d" FOREIGN KEY ("hospitalAdminId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD CONSTRAINT "FK_e5dd121e44733d4388611ead9ab" FOREIGN KEY ("hospitalHospitalId") REFERENCES "hospitals"("hospitalId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP CONSTRAINT "FK_e5dd121e44733d4388611ead9ab"`);
        await queryRunner.query(`ALTER TABLE "hospitals" DROP CONSTRAINT "FK_a860bcad76ea98c58844d4cb74d"`);
        await queryRunner.query(`ALTER TABLE "hospitals" DROP CONSTRAINT "FK_6f55f6d8c073bb27bf757c2bb11"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP CONSTRAINT "FK_ede538260353719cc4d4d048b7a"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP CONSTRAINT "FK_9321466502afd36ffe936b91e23"`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" DROP CONSTRAINT "UQ_24013299e57aa7e94e09b2fb5da"`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" DROP COLUMN "familyMonthlyIncome"`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" ADD "familyMonthlyIncome" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" ADD CONSTRAINT "UQ_24013299e57aa7e94e09b2fb5da" UNIQUE ("familyMonthlyIncome")`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" DROP CONSTRAINT "UQ_93165094da08307ee0031e781a7"`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" DROP COLUMN "averageMonthlyIncome"`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" ADD "averageMonthlyIncome" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient_personal_history" ADD CONSTRAINT "UQ_93165094da08307ee0031e781a7" UNIQUE ("averageMonthlyIncome")`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP CONSTRAINT "UQ_e5dd121e44733d4388611ead9ab"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP COLUMN "hospitalHospitalId"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP CONSTRAINT "UQ_9321466502afd36ffe936b91e23"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" DROP COLUMN "chfIdChfId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD "chfIdChfId" integer`);
        await queryRunner.query(`ALTER TABLE "patient_ewallet" ADD CONSTRAINT "REL_9321466502afd36ffe936b91e2" UNIQUE ("chfIdChfId")`);
        await queryRunner.query(`DROP TABLE "hospitals"`);
        await queryRunner.query(`DROP TABLE "patient_ewallet"`);
    }

}
