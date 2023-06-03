import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager, runSeeder } from "typeorm-extension";

import { RolesSeeder } from "./RolesSeeder";
import { AdminSeeder } from "./AdminSeeder";
import { CoursesSeeder } from "./CoursesSeeder";
import { DisciplinesSeeder } from "./DisciplinesSeeder";
import { TeachingUnitsSeeder } from "./TeachingUnitsSeeder";

export class ManagerSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    await runSeeder(dataSource, RolesSeeder);
    await runSeeder(dataSource, AdminSeeder);
    await runSeeder(dataSource, DisciplinesSeeder);
    await runSeeder(dataSource, TeachingUnitsSeeder);
    await runSeeder(dataSource, CoursesSeeder);
  }
}
