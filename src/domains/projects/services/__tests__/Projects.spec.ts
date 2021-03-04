import request from 'supertest';
import { Connection, getRepository, getConnection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';

import { Project } from '@domains/projects/infra/typeorm/entities/Project';

import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('Project', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.query('DROP TABLE IF EXISTS migrations');
    await connection.query('DROP TABLE IF EXISTS navers_projects');
    await connection.query('DROP TABLE IF EXISTS navers');
    await connection.query('DROP TABLE IF EXISTS projects');
    await connection.query('DROP TABLE IF EXISTS users');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM navers_projects');
    await connection.query('DELETE FROM navers');
    await connection.query('DELETE FROM projects');
    await connection.query('DELETE FROM users');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should create a project', async () => {
    const projectsRepository = getRepository(Project);

    await request(app).post('/users').send({
      email: 'test@email.com',
      password: '123123',
    });

    const authUser = await request(app).post('/sessions').send({
      email: 'test@email.com',
      password: '123123',
    });

    const project = await request(app)
      .post('/projects')
      .send({
        name: 'Projeto 1',
        navers: [],
      })
      .set('Authorization', `bearer ${authUser.body.token}`);

    const projectSearch = await projectsRepository.findOne({
      where: {
        name: 'Projeto 1',
      },
    });

    expect(projectSearch).toBeTruthy();
    expect(project.body).toHaveProperty('name', 'Projeto 1');
  });

  it('should show a project', async () => {
    await request(app).post('/users').send({
      email: 'test@email.com',
      password: '123123',
    });

    const authUser = await request(app).post('/sessions').send({
      email: 'test@email.com',
      password: '123123',
    });

    const naver = await request(app)
      .post('/navers')
      .send({
        name: 'Maria',
        birthdate: '1999-05-15',
        admission_date: '2020-06-12',
        job_role: 'Desenvolvedora',
        projects: [],
      })
      .set('Authorization', `bearer ${authUser.body.token}`);

    const project = await request(app)
      .post('/projects')
      .send({
        name: 'Projeto 1',
        navers: [naver.body.id],
      })
      .set('Authorization', `bearer ${authUser.body.token}`);

    const showProject = await request(app)
      .get(`/projects/${project.body.id}`)
      .set('Authorization', `bearer ${authUser.body.token}`);

    expect(showProject.body.navers[0]).toHaveProperty('name', 'Maria');
    expect(showProject.body.project).toHaveProperty('name', 'Projeto 1');
  });

  it('should list all projects', async () => {
    await request(app).post('/users').send({
      email: 'test@email.com',
      password: '123123',
    });

    const authUser = await request(app).post('/sessions').send({
      email: 'test@email.com',
      password: '123123',
    });

    await request(app)
      .post('/projects')
      .send({
        name: 'Projeto 1',
        navers: [],
      })
      .set('Authorization', `bearer ${authUser.body.token}`);

    await request(app)
      .post('/projects')
      .send({
        name: 'Projeto 2',
        navers: [],
      })
      .set('Authorization', `bearer ${authUser.body.token}`);

    await request(app)
      .post('/projects')
      .send({
        name: 'Projeto 3',
        navers: [],
      })
      .set('Authorization', `bearer ${authUser.body.token}`);

    const listProjects = await request(app)
      .get(`/projects`)
      .set('Authorization', `bearer ${authUser.body.token}`);

    expect(listProjects.body).toHaveLength(3);
  });

  it('should update a project', async () => {
    const projectsRepository = getRepository(Project);

    await request(app).post('/users').send({
      email: 'test@email.com',
      password: '123123',
    });

    const authUser = await request(app).post('/sessions').send({
      email: 'test@email.com',
      password: '123123',
    });

    const project = await request(app)
      .post('/projects')
      .send({
        name: 'projeto maneiro',
        navers: [],
      })
      .set('Authorization', `bearer ${authUser.body.token}`);

    const updateProject = await request(app)
      .put(`/projects/${project.body.id}`)
      .send({
        name: 'Projeto atualizado',
        navers: [],
      })
      .set('Authorization', `bearer ${authUser.body.token}`);

    const getProject = await projectsRepository.findOne({
      where: {
        name: 'Projeto atualizado',
      },
    });

    expect(updateProject.body).toHaveProperty('name', 'Projeto atualizado');
    expect(getProject).toBeTruthy();
  });

  it('should delete a project', async () => {
    const projectsRepository = getRepository(Project);

    await request(app).post('/users').send({
      email: 'test@email.com',
      password: '123123',
    });

    const authUser = await request(app).post('/sessions').send({
      email: 'test@email.com',
      password: '123123',
    });

    const project = await request(app)
      .post('/projects')
      .send({
        name: 'projeto 1',
        navers: [],
      })
      .set('Authorization', `bearer ${authUser.body.token}`);

    await request(app)
      .delete(`/projects/${project.body.id}`)
      .set('Authorization', `bearer ${authUser.body.token}`);

    const projectExists = await projectsRepository.findOne({
      where: { name: 'projeto 1' },
    });

    expect(projectExists).toBeFalsy();
  });
});
