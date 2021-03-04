import { injectable, inject } from 'tsyringe';
import {
  INaversRepository,
  IFindByIdNaverResponse,
} from '@domains/navers/repositories/INaversRepository';

interface IRequest {
  naver_id: number;
}

@injectable()
export class GetOneNaverService {
  constructor(
    @inject('NaversRepository')
    private naversRepository: INaversRepository
  ) {}

  public async execute({
    naver_id,
  }: IRequest): Promise<IFindByIdNaverResponse> {
    const naver = await this.naversRepository.findById(naver_id);

    return naver;
  }
}
