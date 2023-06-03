import { injectable, inject } from "tsyringe";
import { sign } from "jsonwebtoken";

// config
import authConfig from "@config/auth";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// providers
import { IDateProvider } from "@shared/container/providers/DateProvider/models/IDateProvider";

// repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IStudentsRepository } from "@modules/students/repositories/IStudentsRepository";
import { ITeachingUnitsRepository } from "@modules/teachingUnits/repositories/ITeachingUnitsRepository";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { IDisciplinesRepository } from "@modules/disciplines/repositories/IDisciplinesRepository";
import { IRolesRepository } from "@modules/roles/repositories/IRolesRepository";
import { IUserTokensRepository } from "@modules/users/repositories/IUserTokensRepository";

// entities
import { StudentEntity } from "../infra/typeorm/entities/StudentEntity";
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";

interface IRequest {
  fullName?: string;
  displayName?: string;
  email: string;
  secundaryEmail?: string;
  unitId: string;
  courseId: string;
  disciplineId: string;
  phone?: string;
}

interface IResponse {
  student: StudentEntity;
  token: string;
  refreshToken: string;
}

@injectable()
export class CreateStudentService {
  constructor(
    // @ts-ignore
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    // @ts-ignore
    @inject("TeachingUnitsRepository")
    private teachingUnitsRepository: ITeachingUnitsRepository,

    // @ts-ignore
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,

    // @ts-ignore
    @inject("DisciplinesRepository")
    private disciplinesRepository: IDisciplinesRepository,

    // @ts-ignore
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,

    // @ts-ignore
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    // @ts-ignore
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    // @ts-ignore
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository,
  ) {}

  public async execute({
    fullName,
    displayName,
    email,
    // secundaryEmail,
    unitId,
    courseId,
    disciplineId,
  }: // phone
  IRequest): Promise<IResponse> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser || !findUser.id) {
      throw new AppError(MessagesHelper.USER_NOT_FOUND, 404);
    }

    if (fullName) {
      findUser.fullName = fullName;
    }

    if (displayName) {
      findUser.displayName = displayName;
    }

    findUser.isProfileCompleted = true;

    const findRole = await this.rolesRepository.findByName("student");

    const roles: RoleEntity[] = [];

    if (!findRole) {
      throw new AppError("", 404);
    }

    roles.push(findRole);

    findUser.roles = roles;

    const {
      secretToken,
      expiresInToken,
      secretRefreshToken,
      expiresInRefreshToken,
      expiresInRefreshTokenDays,
    } = authConfig;

    const roleNames = findUser.roles.map((role) => role.name);

    // token
    const token = sign(
      {
        roles: roleNames,
      },
      secretToken,
      {
        subject: findUser.id,
        expiresIn: expiresInToken,
      },
    );

    // refresh token
    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: findUser.id,
      expiresIn: expiresInRefreshToken,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresInRefreshTokenDays,
    );

    await this.userTokensRepository.create({
      userId: findUser.id,
      token,
      expiresDate: refreshTokenExpiresDate,
      tokenType: "refresh_token",
    });

    // if (secundaryEmail) {
    //   findUser.secundaryEmail = secundaryEmail;
    // }

    await this.usersRepository.update(findUser);

    const findUnit = await this.teachingUnitsRepository.findById(unitId);

    if (!findUnit) {
      throw new AppError("", 404);
    }

    const findCourse = await this.coursesRepository.findById(courseId);

    if (!findCourse) {
      throw new AppError("", 404);
    }

    const findDiscipline = await this.disciplinesRepository.findById(
      disciplineId,
    );

    if (!findDiscipline) {
      throw new AppError("", 404);
    }

    const student = await this.studentsRepository.create({
      user: findUser,
      teachingUnit: findUnit,
      course: findCourse,
      discipline: findDiscipline,
    });

    return {
      student,
      token,
      refreshToken,
    };
  }
}
