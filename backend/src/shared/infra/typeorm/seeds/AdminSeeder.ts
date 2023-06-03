import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { hash } from "bcryptjs";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";
import { RoleEntity } from "@modules/roles/infra/typeorm/entities/RoleEntity";

export class AdminSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    const usersRepository = dataSource.getRepository(UserEntity);
    const rolesRes = dataSource.getRepository(RoleEntity);

    const roles: RoleEntity[] = [];

    const findAdminRole = await rolesRes.findOne({
      where: { name: "admin" },
    });

    if (findAdminRole) {
      roles.push(findAdminRole);
    }

    const password = "123456";

    const passwordHash = await hash(password, 8);

    const userData: UserEntity = {
      fullName: "Administrador",
      displayName: "Admin",
      email: "fatec.arthurdeazevedo@gmail.com",
      password: passwordHash,
      avatarUrl: null,
      isEmailVerified: true,
      isProfileCompleted: true,
      roles,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleteAt: null,
    };

    const findUser = await usersRepository.findOne({
      where: { email: userData.email },
    });

    if (findUser) {
      return;
    }

    const newUser = usersRepository.create(userData);

    await usersRepository.save(newUser);
  }
}
