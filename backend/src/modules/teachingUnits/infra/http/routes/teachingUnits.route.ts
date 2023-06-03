import { Router } from "express";

import { TeachingUnitsController } from "@modules/teachingUnits/infra/http/controllers/TeachingUnitsController";

const teachingUnitsRouter = Router();

const teachingUnitsController = new TeachingUnitsController();

teachingUnitsRouter.get("/", teachingUnitsController.index);

export { teachingUnitsRouter };
