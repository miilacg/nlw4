import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe('Surveys', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
      });

    afterAll(async() => { //sempre depois que um teste for executado
        const connection = getConnection();
        await connection.dropDatabase(); //remove as tabelas que foram criadas
        await connection.close();
    });

    it('Should be able to create a new survey', async () => { //descrever bem o que vai ser feito no teste
        const response = await request(app).post('/surveys').send({ //passa a rota que eu quero testar
            title: 'title example',
            description: 'description example'
        });
    
        expect(response.status).toBe(201); //o resultado que eu espero
        expect(response.body).toHaveProperty('id');
    });

    it('Should be able to get all surveys', async () => {
        await request(app).post('/surveys').send({ 
            title: 'title example 2',
            description: 'description example 2'
        });

        const response = await request(app).get('/surveys');
        expect(response.body.length).toBe(2); 
    });
});