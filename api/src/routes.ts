import { Router } from 'express';
import { UserController } from './controllers/UserController';

const router = Router();
const userController = new UserController();

/*
    GET => busca
    POST => salvar (quando ta trabalhando com post, normalmente recebe uma informação)
    PUT => alterar
    DELETE => deletar
    PATCH => altaração especifica
*/

//http://localhost:3333/users
//pode ter o mesmo nome de rota desde que sejam metodos diferentes
//parametro 1 => rota (recurso API = 'users')
//parametro 2 => requist, response (no caso, o segundo parametro chama o metodo que tem o request e response)
router.post("/users", userController.create);

export { router };