import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {
    //Rout params => parametros que compõe a rota
    //routes.get("/answer/:value")

    //Query params => paramentros não obrigatorios. A url continua a funcionar mesmo sem eles
    //Ele vem sempre depois do ?
    //chave=valor


    async execute(request: Request, response: Response){
        const { value } = request.params;
        const { u } = request.query;

        const serveyUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await serveyUsersRepository.findOne({
            id: String(u) //o u vai ser obrigatoriamente uma string
        });

        if(!surveyUser){
            throw new AppError('Survey User does not exists!')
        }

        surveyUser.value = Number(value);

        await serveyUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController };