import { getRepository, Repository } from 'typeorm';

import { IProjectsRepository } from '@domains/projects/repositories/IProjectsRepository';
import { ICreateProjectDTO } from '@domains/projects/dtos/ICreateProjectDTO';
import { IUpdateProjectDTO } from '@domains/projects/dtos/IUpdateProjectDTO';

import { Project } from '@domains/projects/infra/typeorm/entities/Project';

export class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findById(id: number): Promise<Project | undefined> {
    const naver = await this.ormRepository.findOne(id);

    return naver;
  }

  public async findAll(): Promise<Project[]> {
    const navers = await this.ormRepository.find();

    return navers;
  }

  public async create(data: ICreateProjectDTO): Promise<Project> {
    const naver = this.ormRepository.create({
      name: data.name,
      created_by_id: data.created_by_id,
      navers: data.navers,
    });

    await this.ormRepository.save(naver);

    return naver;
  }

  public async save(project: Project): Promise<Project> {
    return this.ormRepository.save(project);
  }

  public async update(data: IUpdateProjectDTO): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne(data.id);

    if (!project) {
      return undefined;
    }

    project.name = data.name;
    project.navers = data.navers;

    return project;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async findByIds(ids: number[]): Promise<Project[]> {
    const projects = await this.ormRepository.findByIds(ids);

    return projects;
  }
}
