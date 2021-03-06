import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();
const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();



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

router.post('/surveys', surveysController.create);
router.get('/surveys', surveysController.show);

router.post('/sendMail', sendMailController.execute);

router.get("/answers/:value", answerController.execute);

router.get("/nps/:survey_id", npsController.execute);

export { router };
