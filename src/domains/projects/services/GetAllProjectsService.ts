import { injectable, inject } from 'tsyringe';
import { IProjectsRepository } from '@domains/projects/repositories/IProjectsRepository';

import { Project } from '@domains/projects/infra/typeorm/entities/Project';

@injectable()
export class GetAllProjectsService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute(): Promise<Project[]> {
    const projects = await this.projectsRepository.findAll();

    return projects;
  }
}
