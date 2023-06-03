import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";
import { TeachingUnitEntity } from "@modules/teachingUnits/infra/typeorm/entities/TeachingUnitEntity";
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";

export interface ICreateStudentDTO {
  user: UserEntity;
  teachingUnit: TeachingUnitEntity;
  course: CourseEntity;
  discipline: DisciplineEntity;
}
