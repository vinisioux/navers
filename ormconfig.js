module.exports = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'navers',
  entities:
    process.env.NODE_ENV === 'dev'
      ? ['./src/domains/**/infra/typeorm/entities/*.ts']
      : ['./dist/domains/**/infra/typeorm/entities/*.js'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
