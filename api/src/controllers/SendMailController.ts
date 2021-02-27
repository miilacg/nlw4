import { Request, Response } from 'express';
import { resolve } from 'path'; //para conseguir mapear o endereço das pastas
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body; //poderia ser o id ao inves de email
        
        const usersRepository = getCustomRepository(UsersRepository); // chama para saber se o usuario realmente existe
        const surveysRepository = getCustomRepository(SurveysRepository); // chama para saber se a pesquisa realmente existe
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const user = await usersRepository.findOne({ email });
        if (!user) { //se o usuario não exitir
            throw new AppError('Survey does not exists!');
        }

        const survey = await surveysRepository.findOne({ id: survey_id }); //id: survey_id é a mesma coisa id = servey_id no select where
        if(!survey){ //se a pesquisa não existir
            throw new AppError('Survey does not exists!');
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs"); //pega o diretorio exato da app

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: { user_id: user.id, value: null, survey_id: survey_id },
            relations: ["user", "survey"],
        });

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: '',
            link: process.env.URL_MAIL
        }
       
        if(surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }

        //salvar as informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({ user_id: user.id, survey_id });
        await surveysUsersRepository.save(surveyUser);

        //enviar e-mail para o usuario      
        variables.id = surveyUser.id; 
        await SendMailService.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser);
    }
}

export { SendMailController };
