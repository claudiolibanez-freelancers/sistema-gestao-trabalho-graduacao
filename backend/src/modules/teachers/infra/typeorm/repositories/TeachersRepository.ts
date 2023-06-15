import { Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreateTeacherDTO } from "@modules/teachers/dtos/ICreateTeacherDTO";

// repositories

import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";

// entities
import { TeacherEntity } from "@modules/teachers/infra/typeorm/entities/TeacherEntity";

export class TeachersRepository implements ITeachersRepository {
  private repository: Repository<TeacherEntity>;

  constructor() {
    this.repository = dataSource.getRepository(TeacherEntity);
  }

  public async findById(id: string): Promise<TeacherEntity | null> {
    const teacher = await this.repository.findOne({
      where: {
        id,
      },
      relations: ["user", "school", "groupTeacherInvites", "groups"],
    });

    return teacher;
  }

  public async findByUserId(id: string): Promise<TeacherEntity | null> {
    const teacher = await this.repository.findOne({
      where: {
        userId: id,
      },
      relations: ["user", "school", "groupTeacherInvites", "groups"],
    });

    return teacher;
  }

  public async findAll(): Promise<TeacherEntity[]> {
    const teachers = await this.repository.find({
      relations: ["user"],
    });

    return teachers;
  }

  public async create({
    user,
    school,
  }: ICreateTeacherDTO): Promise<TeacherEntity> {
    const teacher = this.repository.create({
      user,
      school,
    });

    await this.repository.save(teacher);

    return teacher;
  }

  public async update(teacher: TeacherEntity): Promise<TeacherEntity> {
    return this.repository.save(teacher);
  }
}
