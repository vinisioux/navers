import request from 'supertest';
import { Connection, getRepository, getConnection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';

import { Naver } from '@domains/navers/infra/typeorm/entities/Naver';

import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('Naver', () => {
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
    await connection.query('DELETE FROM navers');
    await connection.query('DELETE FROM projects');
    await connection.query('DELETE FROM navers_projects');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should create a Naver', async () => {
    const naversRepository = getRepository(Naver);

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

    const naverSearch = await naversRepository.findOne({
      where: {
        name: 'Maria',
        job_role: 'Desenvolvedora',
      },
    });

    expect(naverSearch).toBeTruthy();
    expect(naver.body).toHaveProperty('name', 'Maria');
  });

  it('should show a Naver', async () => {
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

    const showNaver = await request(app)
      .get(`/navers/${naver.body.id}`)
      .set('Authorization', `bearer ${authUser.body.token}`);

    expect(showNaver.body.naver).toBeTruthy();
    expect(showNaver.body.naver).toHaveProperty('name', 'Maria');
  });

  it('should not show a Naver when he is not exists', async () => {
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

    const showNaver = await request(app)
      .get(`/navers/${naver.body.id + 12312}`)
      .set('Authorization', `bearer ${authUser.body.token}`);

    expect(showNaver.body.message).toBe('Naver not found.');
  });

  it('should list all Navers', async () => {
    await request(app).post('/users').send({
      email: 'test@email.com',
      password: '123123',
    });

    const authUser = await request(app).post('/sessions').send({
      email: 'test@email.com',
      password: '123123',
    });

    await request(app)
      .post('/navers')
      .send({
        name: 'Maria',
        birthdate: '1999-05-15',
        admission_date: '2020-06-12',
        job_role: 'Desenvolvedora',
        projects: [],
      })
      .set('Authorization', `bearer ${authUser.body.token}`);

    await request(app)
      .post('/navers')
      .send({
        name: 'João',
        birthdate: '1979-05-11',
        admission_date: '2010-06-12',
        job_role: 'Diretor',
        projects: [],
      })
      .set('Authorization', `bearer ${authUser.body.token}`);

    await request(app)
      .post('/navers')
      .send({
        name: 'Roberta',
        birthdate: '1989-05-15',
        admission_date: '2012-06-12',
        job_role: 'Analista',
        projects: [],
      })
      .set('Authorization', `bearer ${authUser.body.token}`);

    const listNavers = await request(app)
      .get(`/navers`)
      .set('Authorization', `bearer ${authUser.body.token}`);

    expect(listNavers.body).toHaveLength(3);
  });

  it('should update a Naver', async () => {
    const naversRepository = getRepository(Naver);

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

    const updateNaver = await request(app)
      .put(`/navers/${naver.body.id}`)
      .send({
        name: 'Fulano123',
        birthdate: '1988-06-11',
        admission_date: '2019-02-01',
        job_role: 'Analista',
        projects: [],
      })
      .set('Authorization', `bearer ${authUser.body.token}`);

    const getNaver = await naversRepository.findOne({
      where: {
        name: 'Fulano123',
        job_role: 'Analista',
      },
    });

    const listNaver = await request(app)
      .get(`/navers/${updateNaver.body.id}`)
      .set('Authorization', `bearer ${authUser.body.token}`);

    expect(updateNaver.body).toHaveProperty('name', 'Fulano123');
    expect(getNaver).toBeTruthy();
    expect(listNaver.body.naver.job_role).toBe('Analista');
  });

  it('should delete a Naver', async () => {
    const naversRepository = getRepository(Naver);

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

    await request(app)
      .delete(`/navers/${naver.body.id}`)
      .set('Authorization', `bearer ${authUser.body.token}`);

    const userExists = await naversRepository.findOne({
      where: { name: 'Maria' },
    });

    expect(userExists).toBeFalsy();
  });
});
