import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateRolesPermissionsTable1684797420419
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "roles_permissions",
        columns: [
          {
            name: "role_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "permission_id",
            type: "uuid",
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys("roles_permissions", [
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedTableName: "roles",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["permission_id"],
        referencedTableName: "permissions",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("roles_permissions", "role_id");
    await queryRunner.dropForeignKey("roles_permissions", "permission_id");

    await queryRunner.dropTable("roles_permissions");
  }
}
