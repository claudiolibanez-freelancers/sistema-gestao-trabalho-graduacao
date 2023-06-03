import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { CreateStudentService } from "@modules/students/services/CreateStudentService";

export class StudentsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const {
      fullName,
      displayName,
      email,
      secundaryEmail,
      unitId,
      courseId,
      disciplineId,
      phone,
    } = request.body;

    const createStudent = container.resolve(CreateStudentService);

    const { student, token, refreshToken } = await createStudent.execute({
      fullName,
      displayName,
      email,
      secundaryEmail,
      unitId,
      courseId,
      disciplineId,
      phone,
    });

    return response.json({
      student: instanceToPlain(student),
      token,
      refreshToken,
    });
  }
}
