import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1682822305853 implements MigrationInterface {
    name = 'NewMigration1682822305853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" integer PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "description" varchar, "duration" integer, "price" integer NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
