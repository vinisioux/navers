import { Project } from '@domains/projects/infra/typeorm/entities/Project';

import { ICreateProjectDTO } from '@domains/projects/dtos/ICreateProjectDTO';
import { IUpdateProjectDTO } from '@domains/projects/dtos/IUpdateProjectDTO';

export interface IProjectsRepository {
  findById(id: number): Promise<Project | undefined>;
  findAll(): Promise<Project[]>;
  create(data: ICreateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
  update(data: IUpdateProjectDTO): Promise<Project | undefined>;
  delete(id: number): Promise<void>;
  findByIds(ids: number[]): Promise<Project[]>;
}
