import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveysUsers1614358120494 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'surveys_users',
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: 'user_id', //vai referenciar o usuario que ta repondendo essa pesquisa
                        type: "uuid",
                    },
                    {
                        name: 'survey_id',
                        type: 'uuid',
                    },
                    {
                        name: "value",
                        type: "number",
                        isNullable: true //permite que a coluna tenha valores nulos 
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                //como a foreignKeys foi criada dentro do createTable quando der umm down a foreignKeys tbm é excluida
                //se fosse feito fora a foreignKeys deveria ser removida antes de remover a tabela
                foreignKeys: [ //precisa fazer isso pq tem chaves estrangeiras
                    {
                        name: "FKUser",
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'], //espera um array
                        columnNames: ['user_id'],
                        onDelete: "CASCADE", //quando algum dado que a tabela surveys_users fizer referencia for alterado
                        onUpdate: "CASCADE" //a surveys_users tbm será alterada automaticamente
                    },
                    {
                        name: 'FKSurvey',
                        referencedTableName: 'surveys',
                        referencedColumnNames: ['id'],
                        columnNames: ['survey_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ] 
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('surveys_users');
    }
}