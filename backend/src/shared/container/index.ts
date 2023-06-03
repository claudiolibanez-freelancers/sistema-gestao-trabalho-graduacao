import { container } from "tsyringe";

// users providers
import "@modules/users/providers";

// global providers
import "@shared/container/providers";

// users repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";

// user tokens repositories
import { IUserTokensRepository } from "@modules/users/repositories/IUserTokensRepository";
import { UserTokensRepository } from "@modules/users/infra/typeorm/repositories/UserTokensRepository";

// permissions repositories
import { IPermissionsRepository } from "@modules/permissions/repositories/IPermissionsRepository";
import { PermissionsRepository } from "@modules/permissions/infra/typeorm/repositories/PermissionsRepository";

// permissions repositories
import { IRolesRepository } from "@modules/roles/repositories/IRolesRepository";
import { RolesRepository } from "@modules/roles/infra/typeorm/repositories/RolesRepository";

// permissions repositories
import { IRolesPermissionsRepository } from "@modules/roles/repositories/IRolesPermissionsRepository";
import { RolesPermissionsRepository } from "@modules/roles/infra/typeorm/repositories/RolesPermissionsRepository";

// teaching units repositories
import { ITeachingUnitsRepository } from "@modules/teachingUnits/repositories/ITeachingUnitsRepository";
import { TeachingUnitsRepository } from "@modules/teachingUnits/infra/typeorm/repositories/TeachingUnitsRepository";

// courses repositories
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { CoursesRepository } from "@modules/courses/infra/typeorm/repositories/CoursesRepository";

// disciplines repositories
import { IDisciplinesRepository } from "@modules/disciplines/repositories/IDisciplinesRepository";
import { DisciplinesRepository } from "@modules/disciplines/infra/typeorm/repositories/DisciplinesRepository";

// disciplines repositories
import { IStudentsRepository } from "@modules/students/repositories/IStudentsRepository";
import { StudentsRepository } from "@modules/students/infra/typeorm/repositories/StudentsRepository";

// users register
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

// user tokens register
container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository,
);

// permissions register
container.registerSingleton<IPermissionsRepository>(
  "PermissionsRepository",
  PermissionsRepository,
);

// roles register
container.registerSingleton<IRolesRepository>(
  "RolesRepository",
  RolesRepository,
);

// roles register
container.registerSingleton<IRolesPermissionsRepository>(
  "RolesPermissionsRepository",
  RolesPermissionsRepository,
);

// teaching units register
container.registerSingleton<ITeachingUnitsRepository>(
  "TeachingUnitsRepository",
  TeachingUnitsRepository,
);

// courses register
container.registerSingleton<ICoursesRepository>(
  "CoursesRepository",
  CoursesRepository,
);

// disciplines register
container.registerSingleton<IDisciplinesRepository>(
  "DisciplinesRepository",
  DisciplinesRepository,
);

// students register
container.registerSingleton<IStudentsRepository>(
  "StudentsRepository",
  StudentsRepository,
);
