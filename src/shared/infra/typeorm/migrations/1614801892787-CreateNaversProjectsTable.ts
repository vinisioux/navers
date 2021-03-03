import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNaversProjectsTable1614801892787
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'navers_projects',
        columns: [
          {
            name: 'id',
            type: 'SERIAL',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'naver_id',
            type: 'SERIAL',
          },
          {
            name: 'project_id',
            type: 'SERIAL',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_navers_projects',
            referencedTableName: 'navers',
            referencedColumnNames: ['id'],
            columnNames: ['naver_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_projects_navers',
            referencedTableName: 'projects',
            referencedColumnNames: ['id'],
            columnNames: ['project_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('navers_projects');
  }
}
