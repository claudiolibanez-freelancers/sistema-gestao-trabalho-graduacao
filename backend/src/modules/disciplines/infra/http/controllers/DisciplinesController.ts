import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

// services
import { ListDisciplinesService } from "@modules/disciplines/services/ListDisciplinesService";

export class DisciplinesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listDisciplinesService = container.resolve(ListDisciplinesService);

    const { disciplines } = await listDisciplinesService.execute();

    return response.json({
      disciplines: instanceToPlain(disciplines),
    });
  }
}
