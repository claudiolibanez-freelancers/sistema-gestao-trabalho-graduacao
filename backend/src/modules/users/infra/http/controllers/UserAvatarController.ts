import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

import { UpdateUserAvatarService } from "@modules/users/services/UpdateUserAvatarService";

export class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const avatarFilename = request.file
      ?.filename as Express.Multer.File["filename"];

    const { user } = await updateUserAvatar.execute({
      id: request.user.id,
      avatarFilename,
    });

    return response.json({
      user: instanceToPlain(user),
    });
  }
}
