import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNaversTable1614799630229 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'navers',
        columns: [
          {
            name: 'id',
            type: 'SERIAL',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'birthdate',
            type: 'date',
          },
          {
            name: 'admission_date',
            type: 'date',
          },
          {
            name: 'job_role',
            type: 'varchar',
          },
          {
            name: 'created_by_id',
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
            name: 'FK_user_naver',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['created_by_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('navers');
  }
}
