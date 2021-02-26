import { EntityRepository, Repository } from 'typeorm';
import { SurveyUser } from '../models/SurveyUser';

@EntityRepository(SurveyUser)
class SurveysUsersRepository extends Repository<SurveyUser> {} //SurveyUser é a entidade
  
export { SurveysUsersRepository };