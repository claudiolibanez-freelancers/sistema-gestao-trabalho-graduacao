import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";

export interface IDisciplinesRepository {
  findByName(name: string): Promise<DisciplineEntity | null>;
  findById(id: string): Promise<DisciplineEntity | null>;
  findByIds(ids: string[]): Promise<DisciplineEntity[]>;
  findAll(): Promise<DisciplineEntity[]>;
}
