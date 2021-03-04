import { injectable, inject } from 'tsyringe';
import { INaversRepository } from '@domains/navers/repositories/INaversRepository';

interface IRequest {
  naver_id: number;
  created_by_id: number;
}

@injectable()
export class DeleteNaverService {
  constructor(
    @inject('NaversRepository')
    private naversRepository: INaversRepository
  ) {}

  public async execute({ created_by_id, naver_id }: IRequest): Promise<void> {
    await this.naversRepository.delete({
      id: naver_id,
      created_by_id,
    });
  }
}
