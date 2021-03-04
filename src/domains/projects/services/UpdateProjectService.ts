import { injectable, inject } from 'tsyringe';
import { IProjectsRepository } from '@domains/projects/repositories/IProjectsRepository';
import { INaversRepository } from '@domains/navers/repositories/INaversRepository';

import { Project } from '@domains/projects/infra/typeorm/entities/Project';

interface IRequest {
  project_id: number;
  name: string;
  navers: number[];
  created_by_id: number;
}

@injectable()
export class UpdateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('NaversRepository')
    private naversRepository: INaversRepository
  ) {}

  public async execute({
    created_by_id,
    name,
    navers,
    project_id,
  }: IRequest): Promise<Project> {
    const naversEntities = await this.naversRepository.findByIds(navers);

    const project = await this.projectsRepository.update({
      name,
      navers: naversEntities,
      created_by_id,
      id: project_id,
    });

    return project;
  }
}
