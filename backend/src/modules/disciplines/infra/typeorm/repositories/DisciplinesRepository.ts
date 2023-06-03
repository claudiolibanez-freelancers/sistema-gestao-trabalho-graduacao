import { In, Repository } from "typeorm";

// repositories
import { IDisciplinesRepository } from "@modules/disciplines/repositories/IDisciplinesRepository";

// entities
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";
import { dataSource } from "@shared/infra/typeorm";

export class DisciplinesRepository implements IDisciplinesRepository {
  private repository: Repository<DisciplineEntity>;

  constructor() {
    this.repository = dataSource.getRepository(DisciplineEntity);
  }

  public async findByName(name: string): Promise<DisciplineEntity | null> {
    const discipline = await this.repository.findOne({
      where: { name },
    });

    return discipline;
  }

  public async findById(id: string): Promise<DisciplineEntity | null> {
    const discipline = await this.repository.findOne({
      where: { id },
    });

    return discipline;
  }

  public async findByIds(ids: string[]): Promise<DisciplineEntity[]> {
    const disciplines = await this.repository.find({
      where: {
        id: In(ids),
      },
      relations: ["disciplines"],
    });

    return disciplines;
  }

  public async findAll(): Promise<DisciplineEntity[]> {
    const disciplines = await this.repository.find();

    return disciplines;
  }
}
