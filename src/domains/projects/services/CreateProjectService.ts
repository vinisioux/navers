// import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IProjectsRepository } from '@domains/projects/repositories/IProjectsRepository';
import { INaversRepository } from '@domains/navers/repositories/INaversRepository';

import { Project } from '@domains/projects/infra/typeorm/entities/Project';

interface IRequest {
  name: string;
  navers: number[];
  created_by_id: number;
}

@injectable()
export class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('NaversRepository')
    private naversRepository: INaversRepository
  ) {}

  public async execute({
    name,
    navers,
    created_by_id,
  }: IRequest): Promise<Project> {
    const naversEntities = await this.naversRepository.findByIds(navers);

    const project = await this.projectsRepository.create({
      name,
      navers: naversEntities,
      created_by_id,
    });

    return project;
  }
}
