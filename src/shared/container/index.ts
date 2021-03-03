import { container } from 'tsyringe';

import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { UsersRepository } from '@domains/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
