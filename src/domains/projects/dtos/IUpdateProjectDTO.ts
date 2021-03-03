import { Naver } from '@domains/navers/infra/typeorm/entities/Naver';

export interface IUpdateProjectDTO {
  id: number;
  name: string;
  navers: Naver[];
  created_by_id: number;
}
