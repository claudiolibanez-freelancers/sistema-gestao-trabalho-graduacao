import { injectable, inject } from "tsyringe";

// repositories
import { ITeachingUnitsRepository } from "@modules/teachingUnits/repositories/ITeachingUnitsRepository";

// entities
import { TeachingUnitEntity } from "@modules/teachingUnits/infra/typeorm/entities/TeachingUnitEntity";

interface IResponse {
  teachingUnits: TeachingUnitEntity[];
}

@injectable()
export class ListTeachingUnitsService {
  constructor(
    // @ts-ignore
    @inject("TeachingUnitsRepository")
    private teachingUnitsRepository: ITeachingUnitsRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const teachingUnits = await this.teachingUnitsRepository.findAll();

    return {
      teachingUnits,
    };
  }
}
