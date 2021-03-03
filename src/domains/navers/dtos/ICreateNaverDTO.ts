import { Project } from '@domains/projects/infra/typeorm/entities/Project';

export interface ICreateNaverDTO {
  name: string;
  birthdate: string;
  admission_date: string;
  job_role: string;
  projects: Project[];
  created_by_id: number;
}
