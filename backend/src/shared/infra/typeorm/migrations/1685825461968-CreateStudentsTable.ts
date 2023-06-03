import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateStudentsTable1685825461968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "students",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "user_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "teaching_unit_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "course_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "discipline_id",
            type: "uuid",
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys("students", [
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["teaching_unit_id"],
        referencedTableName: "teaching_units",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["course_id"],
        referencedTableName: "courses",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["discipline_id"],
        referencedTableName: "disciplines",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("students", "discipline_id");
    await queryRunner.dropForeignKey("students", "course_id");
    await queryRunner.dropForeignKey("students", "teaching_unit_id");
    await queryRunner.dropForeignKey("students", "user_id");

    await queryRunner.dropTable("students");
  }
}
