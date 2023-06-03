import { inject, injectable } from "tsyringe";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// repositories
import { ITeachingUnitsRepository } from "@modules/teachingUnits/repositories/ITeachingUnitsRepository";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";

// entities
import { TeachingUnitEntity } from "@modules/teachingUnits/infra/typeorm/entities/TeachingUnitEntity";
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";

interface IRequest {
  name: string;
  courseIds?: string[];
}

interface IResponse {
  teachingUnit: TeachingUnitEntity;
}

@injectable()
export class CreateTeachingUnitService {
  constructor(
    // @ts-ignore
    @inject("TeachingUnitsRepository")
    private teachingUnitsRepository: ITeachingUnitsRepository,

    // @ts-ignore
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ name, courseIds }: IRequest): Promise<IResponse> {
    const findTeachingUnit = await this.teachingUnitsRepository.findByName(
      name,
    );

    if (findTeachingUnit) {
      throw new AppError(MessagesHelper.TEACHING_UNIT_ALREADY_EXISTS, 409);
    }

    let courses: CourseEntity[] = [];

    if (courseIds && courseIds.length > 0) {
      courses = await this.coursesRepository.findByIds(courseIds);
    }

    const teachingUnit = await this.teachingUnitsRepository.create({
      name,
      courses,
    });

    return {
      teachingUnit,
    };
  }
}
