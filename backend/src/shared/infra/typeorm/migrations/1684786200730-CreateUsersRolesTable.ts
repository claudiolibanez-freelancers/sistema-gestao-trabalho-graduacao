import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateUsersRolesTable1684786200730 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_roles",
        columns: [
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "role_id",
            type: "uuid",
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys("users_roles", [
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedTableName: "roles",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("users_roles", "user_id");
    await queryRunner.dropForeignKey("users_roles", "role_id");

    await queryRunner.dropTable("users_roles");
  }
}
