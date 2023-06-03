import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

// entities
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";
import { TeachingUnitEntity } from "@modules/teachingUnits/infra/typeorm/entities/TeachingUnitEntity";

export class CoursesSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    const disciplinesRepository = dataSource.getRepository(DisciplineEntity);
    const coursesRepository = dataSource.getRepository(CourseEntity);
    const teachingUnitsRepository =
      dataSource.getRepository(TeachingUnitEntity);

    const teachingUnit = await teachingUnitsRepository.findOne({
      where: { name: "FATEC - Arthur de Azevedo" },
    });

    if (!teachingUnit || !teachingUnit.id) {
      return;
    }

    const disciplines: DisciplineEntity[] = [];

    const discipline1 = await disciplinesRepository.findOne({
      where: { name: "Trabalho de Graduação I" },
    });

    if (discipline1) {
      disciplines.push(discipline1);
    }

    const discipline2 = await disciplinesRepository.findOne({
      where: { name: "Trabalho de Graduação II" },
    });

    if (discipline2) {
      disciplines.push(discipline2);
    }

    const coursesData: CourseEntity[] = [
      {
        name: "Análise e Desenvolvimento de Sistemas",
        teachingUnit,
        disciplines,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mecatrônica Industrial",
        teachingUnit,
        disciplines,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const course of coursesData) {
      const findCourse = await coursesRepository.findOne({
        where: { name: course.name },
      });

      if (findCourse) {
        return;
      }

      const newCourse = coursesRepository.create(course);

      await coursesRepository.save(newCourse);
    }
  }
}
