import { Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreateStudentDTO } from "@modules/students/dtos/ICreateStudentDTO";

// repositories
import { IStudentsRepository } from "@modules/students/repositories/IStudentsRepository";

// entities
import { StudentEntity } from "@modules/students/infra/typeorm/entities/StudentEntity";

export class StudentsRepository implements IStudentsRepository {
  private repository: Repository<StudentEntity>;

  constructor() {
    this.repository = dataSource.getRepository(StudentEntity);
  }

  public async create(data: ICreateStudentDTO): Promise<StudentEntity> {
    const student = this.repository.create(data);

    await this.repository.save(student);

    return student;
  }
}
