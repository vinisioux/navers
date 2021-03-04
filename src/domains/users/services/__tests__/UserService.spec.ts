import request from 'supertest';
import { Connection, getRepository, getConnection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';

import { User } from '@domains/users/infra/typeorm/entities/User';

import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('User', () => {
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
    await connection.query('DELETE FROM users');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should create a new user', async () => {
    const usersRepository = getRepository(User);

    const response = await request(app).post('/users').send({
      email: 'test@email.com',
      password: '123123',
    });

    const user = await usersRepository.findOne({
      where: {
        email: 'test@email.com',
      },
    });

    expect(user).toBeTruthy();
    expect(response.body.id).toBe(1);
  });

  it('should not create a user when email already exists', async () => {
    const usersRepository = getRepository(User);

    await request(app).post('/users').send({
      email: 'test@email.com',
      password: '123123',
    });

    const response = await request(app).post('/users').send({
      email: 'test@email.com',
      password: 'anotherpassword',
    });

    const users = await usersRepository.find({
      where: {
        email: 'test@email.com',
      },
    });

    expect(users).toHaveLength(1);
    expect(response.body.message).toBe('e-mail address already used');
  });

  it('should authenticate a user', async () => {
    await request(app).post('/users').send({
      email: 'test@email.com',
      password: '123123',
    });

    const response = await request(app).post('/sessions').send({
      email: 'test@email.com',
      password: '123123',
    });

    expect(response.body.user.email).toBe('test@email.com');
    expect(response.body.token).toBeTruthy();
  });

  it('should not authenticate a user with wrong email', async () => {
    await request(app).post('/users').send({
      email: 'test@email.com',
      password: '123123',
    });

    const response = await request(app).post('/sessions').send({
      email: 'wrongemail@email.com',
      password: '123123',
    });

    expect(response.body.message).toBe('Incorrect email/password combination');
    expect(response.body.token).toBeFalsy();
  });

  it('should not authenticate a user with wrong password', async () => {
    await request(app).post('/users').send({
      email: 'test@email.com',
      password: '123123',
    });

    const response = await request(app).post('/sessions').send({
      email: 'test@email.com',
      password: 'wrong-password',
    });

    expect(response.body.message).toBe('Incorrect email/password combination');
    expect(response.body.token).toBeFalsy();
  });
});
