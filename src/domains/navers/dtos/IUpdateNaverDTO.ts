import { Project } from '@domains/projects/infra/typeorm/entities/Project';

export interface IUpdateNaverDTO {
  id: number;
  name: string;
  birthdate: string;
  admission_date: string;
  job_role: string;
  projects: Project[];
  created_by_id: number;
}
