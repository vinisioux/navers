import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { hash } from 'bcryptjs';

import { User } from '@domains/users/infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}
@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('e-mail address already used', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    return user;
  }
}
