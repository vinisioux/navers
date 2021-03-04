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
import { Naver } from '@domains/navers/infra/typeorm/entities/Naver';

import { Exclude } from 'class-transformer';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

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

  @ManyToMany(() => Naver)
  @JoinTable({
    name: 'navers_projects',
    joinColumns: [{ name: 'project_id' }],
    inverseJoinColumns: [{ name: 'naver_id' }],
  })
  navers: Naver[];
}
