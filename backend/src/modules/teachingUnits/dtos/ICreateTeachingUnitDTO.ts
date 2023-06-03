import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";

export interface ICreateTeachingUnitDTO {
  name: string;
  courses?: CourseEntity[];
}
