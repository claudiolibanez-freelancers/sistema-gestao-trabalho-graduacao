import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { ListTeachingUnitsService } from "@modules/teachingUnits/services/ListTeachingUnitsService";

export class TeachingUnitsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTeachingUnits = container.resolve(ListTeachingUnitsService);

    const { teachingUnits } = await listTeachingUnits.execute();

    return response.status(200).json({
      teachingUnits: instanceToPlain(teachingUnits),
    });
  }
}
