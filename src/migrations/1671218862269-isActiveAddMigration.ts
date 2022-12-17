import { MigrationInterface, QueryRunner } from "typeorm";

export class isActiveAddMigration1671218862269 implements MigrationInterface {
    name = 'isActiveAddMigration1671218862269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT 'true'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "users_name_seq"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "users_name_seq" OWNED BY "users"."name"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" SET DEFAULT nextval('"users_name_seq"')`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
    }

}
