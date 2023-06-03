import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { ListCoursesService } from "@modules/courses/services/ListCoursesService";

export class CoursesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCourses = container.resolve(ListCoursesService);

    const { courses } = await listCourses.execute();

    return response.status(200).json({
      courses: instanceToPlain(courses),
    });
  }
}
