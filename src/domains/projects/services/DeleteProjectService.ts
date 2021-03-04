import { injectable, inject } from 'tsyringe';
import { IProjectsRepository } from '@domains/projects/repositories/IProjectsRepository';

interface IRequest {
  project_id: number;
  created_by_id: number;
}

@injectable()
export class DeleteProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({ project_id, created_by_id }: IRequest): Promise<void> {
    await this.projectsRepository.delete({
      id: project_id,
      created_by_id,
    });
  }
}
