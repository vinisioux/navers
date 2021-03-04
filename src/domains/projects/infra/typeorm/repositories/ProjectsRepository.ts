import { getRepository, Repository } from 'typeorm';

import {
  IProjectsRepository,
  IFindByIdProjectResponse,
} from '@domains/projects/repositories/IProjectsRepository';
import { ICreateProjectDTO } from '@domains/projects/dtos/ICreateProjectDTO';
import { IUpdateProjectDTO } from '@domains/projects/dtos/IUpdateProjectDTO';
import { IDeleteProjectDTO } from '@domains/projects/dtos/IDeleteProjectDTO';

import { Project } from '@domains/projects/infra/typeorm/entities/Project';
import { Naver } from '@domains/navers/infra/typeorm/entities/Naver';
import { AppError } from '@shared/errors/AppError';

export class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findById(id: number): Promise<IFindByIdProjectResponse> {
    const project = await this.ormRepository.findOne(id);

    if (!project) {
      throw new AppError('Project not found.');
    }

    const naversInProject = (await this.ormRepository.query(`
      select
        n.id,
        n.name,
        n.birthdate,
        n.admission_date,
        n.job_role
      from
        projects p,
        navers n,
        navers_projects np
      where n.id = np.naver_id
      and   p.id = np.project_id
      and	  p.id = ${id};
    `)) as Naver[];

    return {
      project,
      navers: naversInProject,
    };
  }

  public async findAll(): Promise<Project[]> {
    const projects = await this.ormRepository.find();

    return projects;
  }

  public async create(data: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create({
      name: data.name,
      created_by_id: data.created_by_id,
      navers: data.navers,
    });

    await this.ormRepository.save(project);

    return project;
  }

  public async save(project: Project): Promise<Project> {
    return this.ormRepository.save(project);
  }

  public async update(data: IUpdateProjectDTO): Promise<Project> {
    const project = await this.ormRepository.findOne(data.id);

    if (!project) {
      throw new AppError('Project not found.');
    }

    if (project.created_by_id !== data.created_by_id) {
      throw new AppError('You cannot update this project.');
    }

    project.name = data.name;
    project.navers = data.navers;

    await this.ormRepository.save(project);

    return project;
  }

  public async delete(data: IDeleteProjectDTO): Promise<void> {
    const project = await this.ormRepository.findOne(data.id);

    if (!project) {
      throw new AppError('Naver not found.');
    }

    if (project.created_by_id !== data.created_by_id) {
      throw new AppError('You cannot delete this Naver.');
    }

    await this.ormRepository.remove(project);
  }

  public async findProjectsByIds(ids: number[]): Promise<Project[]> {
    const projects = await this.ormRepository.findByIds(ids);

    return projects;
  }
}
