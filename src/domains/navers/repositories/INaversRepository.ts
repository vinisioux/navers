import { Naver } from '@domains/navers/infra/typeorm/entities/Naver';

import { ICreateNaverDTO } from '@domains/navers/dtos/ICreateNaverDTO';
import { IUpdateNaverDTO } from '@domains/navers/dtos/IUpdateNaverDTO';

export interface INaversRepository {
  findById(id: number): Promise<Naver | undefined>;
  findAll(): Promise<Naver[]>;
  create(data: ICreateNaverDTO): Promise<Naver>;
  save(user: Naver): Promise<Naver>;
  update(data: IUpdateNaverDTO): Promise<Naver | undefined>;
  findByIds(ids: number[]): Promise<Naver[]>;
}
