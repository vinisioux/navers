import { injectable, inject } from 'tsyringe';
import { INaversRepository } from '@domains/navers/repositories/INaversRepository';
import { IProjectsRepository } from '@domains/projects/repositories/IProjectsRepository';

import { Naver } from '@domains/navers/infra/typeorm/entities/Naver';

interface IRequest {
  naver_id: number;
  name: string;
  birthdate: string;
  admission_date: string;
  job_role: string;
  projects: number[];
  created_by_id: number;
}

@injectable()
export class UpdateNaverService {
  constructor(
    @inject('NaversRepository')
    private naversRepository: INaversRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({
    admission_date,
    birthdate,
    created_by_id,
    job_role,
    name,
    projects,
    naver_id,
  }: IRequest): Promise<Naver> {
    const projectsEntities = await this.projectsRepository.findProjectsByIds(
      projects
    );

    const naver = await this.naversRepository.update({
      admission_date,
      birthdate,
      job_role,
      name,
      projects: projectsEntities,
      id: naver_id,
      created_by_id,
    });

    return naver;
  }
}
