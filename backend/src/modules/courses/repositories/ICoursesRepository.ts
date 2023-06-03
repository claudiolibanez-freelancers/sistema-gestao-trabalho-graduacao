import { CourseEntity } from "../infra/typeorm/entities/CourseEntity";

export interface ICoursesRepository {
  findByName(name: string): Promise<CourseEntity | null>;
  findById(id: string): Promise<CourseEntity | null>;
  findByIds(ids: string[]): Promise<CourseEntity[]>;
  findAll(): Promise<CourseEntity[]>;
}
