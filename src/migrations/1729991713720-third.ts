import { MigrationInterface, QueryRunner } from "typeorm";

export class Third1729991713720 implements MigrationInterface {
    name = 'Third1729991713720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient_family_history" ("id" SERIAL NOT NULL, "familySetup" character varying NOT NULL, "familiySize" integer NOT NULL, "birthOrder" character varying NOT NULL, "fatherEducationalLevel" character varying NOT NULL, "motherEducationalLevel" character varying NOT NULL, "fatherOccupation" character varying NOT NULL, "motherOccupation" character varying NOT NULL, "levelOfFamilyCare" integer NOT NULL, "familyMonthlyIncome" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "chfIdChfId" integer, "updatedById" integer, CONSTRAINT "UQ_7624578efd1fc14a8d82b1b3771" UNIQUE ("familySetup"), CONSTRAINT "UQ_9f608e756dea758dbfe95264413" UNIQUE ("familiySize"), CONSTRAINT "UQ_b11cfdfc80ded9f46b91c116786" UNIQUE ("birthOrder"), CONSTRAINT "UQ_30ea4387932002eae4007624aaf" UNIQUE ("fatherEducationalLevel"), CONSTRAINT "UQ_cfe5e779c916e86dbc076f4a7f7" UNIQUE ("motherEducationalLevel"), CONSTRAINT "UQ_ecb9af497e535521f662970397b" UNIQUE ("fatherOccupation"), CONSTRAINT "UQ_ed06204dff867a2e9bfca589f9a" UNIQUE ("motherOccupation"), CONSTRAINT "UQ_73ca1ac36d35a3071aaa73c470e" UNIQUE ("levelOfFamilyCare"), CONSTRAINT "UQ_24013299e57aa7e94e09b2fb5da" UNIQUE ("familyMonthlyIncome"), CONSTRAINT "REL_e65adc882fdcb27ba899b570c4" UNIQUE ("chfIdChfId"), CONSTRAINT "PK_d1300bafd9a62511c1653fd962c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "ethnicity" character varying`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "maritalStatus" character varying`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "numberOfChildren" character varying`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "levelOfEducation" character varying`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "religion" character varying`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "occupation" character varying`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "dateOfBirth" character varying`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" ADD CONSTRAINT "FK_e65adc882fdcb27ba899b570c49" FOREIGN KEY ("chfIdChfId") REFERENCES "patients"("chfId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" ADD CONSTRAINT "FK_62755bb9b1f85182a1c1c32bbc2" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_family_history" DROP CONSTRAINT "FK_62755bb9b1f85182a1c1c32bbc2"`);
        await queryRunner.query(`ALTER TABLE "patient_family_history" DROP CONSTRAINT "FK_e65adc882fdcb27ba899b570c49"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "dateOfBirth"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "occupation"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "religion"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "levelOfEducation"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "numberOfChildren"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "maritalStatus"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "ethnicity"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TABLE "patient_family_history"`);
    }

}
