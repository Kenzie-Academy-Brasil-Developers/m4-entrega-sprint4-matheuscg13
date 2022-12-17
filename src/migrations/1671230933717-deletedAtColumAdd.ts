import { MigrationInterface, QueryRunner } from "typeorm";

export class deletedAtColumAdd1671230933717 implements MigrationInterface {
    name = 'deletedAtColumAdd1671230933717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    }

}
