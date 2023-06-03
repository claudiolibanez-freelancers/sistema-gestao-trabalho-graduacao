import { Repository } from "typeorm";

// datasource
import { dataSource } from "@shared/infra/typeorm";

// dtos
import { ICreateTeachingUnitDTO } from "@modules/teachingUnits/dtos/ICreateTeachingUnitDTO";

// repositories
import { ITeachingUnitsRepository } from "@modules/teachingUnits/repositories/ITeachingUnitsRepository";

// entities
import { TeachingUnitEntity } from "@modules/teachingUnits/infra/typeorm/entities/TeachingUnitEntity";

export class TeachingUnitsRepository implements ITeachingUnitsRepository {
  private repository: Repository<TeachingUnitEntity>;

  constructor() {
    this.repository = dataSource.getRepository(TeachingUnitEntity);
  }

  public async findById(id: string): Promise<TeachingUnitEntity | null> {
    const teachingUnit = await this.repository.findOne({
      where: { id },
      relations: ["courses", "courses.disciplines"],
    });

    return teachingUnit;
  }

  public async findByName(name: string): Promise<TeachingUnitEntity | null> {
    const teachingUnit = await this.repository.findOne({
      where: { name },
      relations: ["courses", "courses.disciplines"],
    });

    return teachingUnit;
  }

  public async findAll(): Promise<TeachingUnitEntity[]> {
    const users = await this.repository.find({
      relations: ["courses", "courses.disciplines"],
    });

    return users;
  }

  public async create(
    data: ICreateTeachingUnitDTO,
  ): Promise<TeachingUnitEntity> {
    const teachingUnit = this.repository.create(data);

    await this.repository.save(teachingUnit);

    return teachingUnit;
  }
}
