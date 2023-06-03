import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

// entities
import { TeachingUnitEntity } from "@modules/teachingUnits/infra/typeorm/entities/TeachingUnitEntity";
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";

export class TeachingUnitsSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    const teachingUnitsRepository =
      dataSource.getRepository(TeachingUnitEntity);

    const courses: CourseEntity[] = [];

    const teachingUnitsData: TeachingUnitEntity = {
      name: "FATEC - Arthur de Azevedo",
      courses,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const findTeachingUnit = await teachingUnitsRepository.findOne({
      where: { name: teachingUnitsData.name },
    });

    if (findTeachingUnit) {
      return;
    }

    const newTeachingUnit = teachingUnitsRepository.create(teachingUnitsData);

    await teachingUnitsRepository.save(newTeachingUnit);
  }
}
