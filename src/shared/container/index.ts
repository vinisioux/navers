import { container } from 'tsyringe';

import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { UsersRepository } from '@domains/users/infra/typeorm/repositories/UsersRepository';

import { INaversRepository } from '@domains/navers/repositories/INaversRepository';
import { NaversRepository } from '@domains/navers/infra/typeorm/repositories/NaversRepository';

import { IProjectsRepository } from '@domains/projects/repositories/IProjectsRepository';
import { ProjectsRepository } from '@domains/projects/infra/typeorm/repositories/ProjectsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<INaversRepository>(
  'NaversRepository',
  NaversRepository
);

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository
);
