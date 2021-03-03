import { getRepository, Repository } from 'typeorm';

import { INaversRepository } from '@domains/navers/repositories/INaversRepository';
import { ICreateNaverDTO } from '@domains/navers/dtos/ICreateNaverDTO';
import { IUpdateNaverDTO } from '@domains/navers/dtos/IUpdateNaverDTO';

import { Naver } from '@domains/navers/infra/typeorm/entities/Naver';

export class NaversRepository implements INaversRepository {
  private ormRepository: Repository<Naver>;

  constructor() {
    this.ormRepository = getRepository(Naver);
  }

  public async findById(id: number): Promise<Naver | undefined> {
    const naver = await this.ormRepository.findOne(id);

    return naver;
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

  public async update(userData: IUpdateNaverDTO): Promise<Naver | undefined> {
    const naver = await this.ormRepository.findOne(userData.id);

    if (!naver) {
      return undefined;
    }

    naver.name = userData.name;
    naver.admission_date = userData.admission_date;
    naver.birthdate = userData.birthdate;
    naver.job_role = userData.job_role;
    naver.projects = userData.projects;

    this.ormRepository.save(naver);

    return naver;
  }

  public async findByIds(ids: number[]): Promise<Naver[]> {
    const navers = await this.ormRepository.findByIds(ids);

    return navers;
  }
}
