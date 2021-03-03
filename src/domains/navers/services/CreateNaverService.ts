// import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { INaversRepository } from '@domains/navers/repositories/INaversRepository';
import { IProjectsRepository } from '@domains/projects/repositories/IProjectsRepository';

import { Naver } from '@domains/navers/infra/typeorm/entities/Naver';

interface IRequest {
  name: string;
  birthdate: string;
  admission_date: string;
  job_role: string;
  projects: number[];
  created_by_id: number;
}

@injectable()
export class CreateNaverService {
  constructor(
    @inject('NaversRepository')
    private naversRepository: INaversRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({
    name,
    admission_date,
    birthdate,
    job_role,
    projects,
    created_by_id,
  }: IRequest): Promise<Naver> {
    const projectsEntities = await this.projectsRepository.findByIds(projects);

    const naver = await this.naversRepository.create({
      admission_date,
      birthdate,
      job_role,
      name,
      projects: projectsEntities,
      created_by_id,
    });

    return naver;
  }
}
