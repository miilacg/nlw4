import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1614270209995 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> { //metodo up é quando eu quero criar a minha migration
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [ //por default a coluna já não pode ser nula
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()" //o proprio bd vai se encarregar de atribuir a data de criação
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> { //metodo down é quando eu quero remover a migration que eu to executando
        await queryRunner.dropTable("users");
    }
}
