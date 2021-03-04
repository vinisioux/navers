import { Project } from '@domains/projects/infra/typeorm/entities/Project';
import { Naver } from '@domains/navers/infra/typeorm/entities/Naver';

import { ICreateProjectDTO } from '@domains/projects/dtos/ICreateProjectDTO';
import { IUpdateProjectDTO } from '@domains/projects/dtos/IUpdateProjectDTO';
import { IDeleteProjectDTO } from '@domains/projects/dtos/IDeleteProjectDTO';

export interface IFindByIdProjectResponse {
  project: Project;
  navers: Naver[];
}

export interface IProjectsRepository {
  findById(id: number): Promise<IFindByIdProjectResponse>;
  findAll(): Promise<Project[]>;
  create(data: ICreateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
  update(data: IUpdateProjectDTO): Promise<Project>;
  findProjectsByIds(ids: number[]): Promise<Project[]>;
  delete(data: IDeleteProjectDTO): Promise<void>;
}
