// dtos
import { ICreateTeachingUnitDTO } from "@modules/teachingUnits/dtos/ICreateTeachingUnitDTO";

// entities
import { TeachingUnitEntity } from "@modules/teachingUnits/infra/typeorm/entities/TeachingUnitEntity";

export interface ITeachingUnitsRepository {
  findAll(): Promise<TeachingUnitEntity[]>;
  findById(id: string): Promise<TeachingUnitEntity | null>;
  findByName(name: string): Promise<TeachingUnitEntity | null>;
  create(data: ICreateTeachingUnitDTO): Promise<TeachingUnitEntity>;
}
