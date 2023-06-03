import { In, Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// repositories
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";

// entities
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";

export class CoursesRepository implements ICoursesRepository {
  private repository: Repository<CourseEntity>;

  constructor() {
    this.repository = dataSource.getRepository(CourseEntity);
  }

  public async findByName(name: string): Promise<CourseEntity | null> {
    const course = await this.repository.findOne({
      where: { name },
      relations: ["disciplines"],
    });

    return course;
  }

  public async findById(id: string): Promise<CourseEntity | null> {
    const course = await this.repository.findOne({
      where: { id },
      relations: ["disciplines"],
    });

    return course;
  }

  public async findByIds(ids: string[]): Promise<CourseEntity[]> {
    const courses = await this.repository.find({
      where: {
        id: In(ids),
      },
      relations: ["disciplines"],
    });

    return courses;
  }

  public async findAll(): Promise<CourseEntity[]> {
    const courses = await this.repository.find({
      relations: ["disciplines"],
    });

    return courses;
  }
}
