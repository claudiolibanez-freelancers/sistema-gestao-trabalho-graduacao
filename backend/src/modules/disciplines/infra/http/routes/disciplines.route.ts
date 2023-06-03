import { Router } from "express";

import { DisciplinesController } from "@modules/disciplines/infra/http/controllers/DisciplinesController";

const disciplinesRouter = Router();

const disciplinesController = new DisciplinesController();

disciplinesRouter.get("/", disciplinesController.index);

export { disciplinesRouter };
