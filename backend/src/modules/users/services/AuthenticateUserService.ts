import { injectable, inject } from "tsyringe";
import { sign } from "jsonwebtoken";

// config
import authConfig from "@config/auth";

// errors
import { AppError } from "@shared/errors/AppError";

// helpers
import { MessagesHelper } from "@helpers/MessagesHelper";

// users providers
import { IHashProvider } from "@modules/users/providers/HashProvider/models/IHashProvider";

// global providers
import { IDateProvider } from "@shared/container/providers/DateProvider/models/IDateProvider";

// repositories
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/users/repositories/IUserTokensRepository";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: UserEntity;
  token: string;
  refreshToken: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    // @ts-ignore
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    // @ts-ignore
    @inject("HashProvider")
    private hashProvider: IHashProvider,

    // @ts-ignore
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    // @ts-ignore
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || !user.id) {
      throw new AppError(MessagesHelper.EMAIL_OR_PASSWORD_INVALID, 401);
    }

    const {
      secretToken,
      expiresInToken,
      secretRefreshToken,
      expiresInRefreshToken,
      expiresInRefreshTokenDays,
    } = authConfig;

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError(MessagesHelper.EMAIL_OR_PASSWORD_INVALID, 401);
    }

    await this.userTokensRepository.deleteAllByUserIdAndTokenType(
      user.id,
      "refresh_token",
    );

    const rolesNames = user.roles.map((role) => role.name);

    const token = sign(
      {
        roles: rolesNames,
      },
      secretToken,
      {
        subject: user.id,
        expiresIn: expiresInToken,
      },
    );

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresInRefreshTokenDays,
    );

    await this.userTokensRepository.create({
      userId: user.id,
      token: refreshToken,
      expiresDate: refreshTokenExpiresDate,
      tokenType: "refresh_token",
    });

    return { user, token, refreshToken };
  }
}
