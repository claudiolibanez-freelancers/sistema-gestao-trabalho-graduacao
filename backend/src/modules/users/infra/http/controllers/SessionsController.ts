import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

import { AuthenticateUserService } from "@modules/users/services/AuthenticateUserService";

export class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token, refreshToken } = await authenticateUser.execute({
      email,
      password,
    });

    return res.json({ user: instanceToPlain(user), token, refreshToken });
  }
}
