import { Router } from "express";

import { CoursesController } from "@modules/courses/infra/http/controllers/CoursesController";

const coursesRouter = Router();

const coursesController = new CoursesController();

coursesRouter.get("/", coursesController.index);

export { coursesRouter };
