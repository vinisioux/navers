import { AppError } from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';

import {
  IFindByIdNaverResponse,
  INaversRepository,
} from '@domains/navers/repositories/INaversRepository';
import { ICreateNaverDTO } from '@domains/navers/dtos/ICreateNaverDTO';
import { IUpdateNaverDTO } from '@domains/navers/dtos/IUpdateNaverDTO';
import { IDeleteNaverDTO } from '@domains/navers/dtos/IDeleteNaverDTO';

import { Naver } from '@domains/navers/infra/typeorm/entities/Naver';
import { Project } from '@domains/projects/infra/typeorm/entities/Project';

export class NaversRepository implements INaversRepository {
  private ormRepository: Repository<Naver>;

  constructor() {
    this.ormRepository = getRepository(Naver);
  }

  public async findById(id: number): Promise<IFindByIdNaverResponse> {
    const naver = await this.ormRepository.findOne(id);

    if (!naver) {
      throw new AppError('Naver not found.');
    }

    const projectsInNaver = (await this.ormRepository.query(`
      select
        p.id,
        p.name 
      from
        projects p,
        navers n,
        navers_projects np
      where n.id = np.naver_id
      and   p.id = np.project_id
      and   n.id = ${id};
    `)) as Project[];

    return {
      naver,
      projects: projectsInNaver,
    };
  }

  public async findAll(): Promise<Naver[]> {
    const navers = await this.ormRepository.find();

    return navers;
  }

  public async create(userData: ICreateNaverDTO): Promise<Naver> {
    const naver = this.ormRepository.create(userData);

    await this.ormRepository.save(naver);

    return naver;
  }

  public async save(naver: Naver): Promise<Naver> {
    return this.ormRepository.save(naver);
  }

  public async update(data: IUpdateNaverDTO): Promise<Naver> {
    const naver = await this.ormRepository.findOne(data.id);

    if (!naver) {
      throw new AppError('Naver not found.');
    }

    if (naver.created_by_id !== data.created_by_id) {
      throw new AppError('You cannot update this Naver.');
    }

    naver.name = data.name;
    naver.admission_date = data.admission_date;
    naver.birthdate = data.birthdate;
    naver.job_role = data.job_role;
    naver.projects = data.projects;

    await this.ormRepository.save(naver);

    return naver;
  }

  public async findByIds(ids: number[]): Promise<Naver[]> {
    const navers = await this.ormRepository.findByIds(ids);

    return navers;
  }

  public async delete(data: IDeleteNaverDTO): Promise<void> {
    const naver = await this.ormRepository.findOne(data.id);

    if (!naver) {
      throw new AppError('Naver not found.');
    }

    if (naver.created_by_id !== data.created_by_id) {
      throw new AppError('You cannot delete this Naver.');
    }

    await this.ormRepository.remove(naver);
  }
}
