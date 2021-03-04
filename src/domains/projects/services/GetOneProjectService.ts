import { injectable, inject } from 'tsyringe';
import {
  IProjectsRepository,
  IFindByIdProjectResponse,
} from '@domains/projects/repositories/IProjectsRepository';

interface IRequest {
  project_id: number;
}

@injectable()
export class GetOneProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({
    project_id,
  }: IRequest): Promise<IFindByIdProjectResponse> {
    const project = await this.projectsRepository.findById(project_id);

    return project;
  }
}
