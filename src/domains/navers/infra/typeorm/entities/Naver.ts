import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from '@domains/users/infra/typeorm/entities/User';
import { Project } from '@domains/projects/infra/typeorm/entities/Project';

import { Exclude } from 'class-transformer';

@Entity('navers')
export class Naver {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  birthdate: string;

  @Column()
  admission_date: string;

  @Column()
  job_role: string;

  @Exclude()
  @Column()
  created_by_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by_id' })
  created_by: User;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Project)
  @JoinTable({
    name: 'navers_projects',
    joinColumns: [{ name: 'naver_id' }],
    inverseJoinColumns: [{ name: 'project_id' }],
  })
  projects: Project[];
}
