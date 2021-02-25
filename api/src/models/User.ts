import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("users")
class User{
    @PrimaryColumn()
    readonly id: string; //readonly não deixa pessoas mudarem o id. a reponsabilidade fica com a classe

    @Column() //se o nome da coluna for diferente do nome do atributo eu preciso passar o nome dela
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){ //se o id não existir
            this.id = uuid()
        }
    }
}

export { User };