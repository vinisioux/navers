import { Naver } from '@domains/navers/infra/typeorm/entities/Naver';

export interface ICreateProjectDTO {
  name: string;
  navers: Naver[];
  created_by_id: number;
}
