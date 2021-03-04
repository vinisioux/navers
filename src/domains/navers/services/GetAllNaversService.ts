import { injectable, inject } from 'tsyringe';
import { INaversRepository } from '@domains/navers/repositories/INaversRepository';

import { Naver } from '@domains/navers/infra/typeorm/entities/Naver';

@injectable()
export class GetAllNaversService {
  constructor(
    @inject('NaversRepository')
    private naversRepository: INaversRepository
  ) {}

  public async execute(): Promise<Naver[]> {
    const navers = await this.naversRepository.findAll();

    return navers;
  }
}
