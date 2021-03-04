import { Naver } from '@domains/navers/infra/typeorm/entities/Naver';
import { Project } from '@domains/projects/infra/typeorm/entities/Project';

import { ICreateNaverDTO } from '@domains/navers/dtos/ICreateNaverDTO';
import { IUpdateNaverDTO } from '@domains/navers/dtos/IUpdateNaverDTO';
import { IDeleteNaverDTO } from '@domains/navers/dtos/IDeleteNaverDTO';

export interface IFindByIdNaverResponse {
  naver: Naver;
  projects: Project[];
}
export interface INaversRepository {
  findById(id: number): Promise<IFindByIdNaverResponse>;
  findAll(): Promise<Naver[]>;
  create(data: ICreateNaverDTO): Promise<Naver>;
  save(user: Naver): Promise<Naver>;
  update(data: IUpdateNaverDTO): Promise<Naver>;
  findByIds(ids: number[]): Promise<Naver[]>;
  delete(data: IDeleteNaverDTO): Promise<void>;
}
