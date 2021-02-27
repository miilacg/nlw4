import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe('Users', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async() => { //sempre depois que um teste for executado
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it('Should be able to create a new user', async () => { //descrever bem o que vai ser feito no teste
        const response = await request(app).post('/users').send({ //passa a rota que eu quero testar
            email: 'user@example.com',
            name: 'User Example',
        });
    
        expect(response.status).toBe(201); //o resultado que eu espero
    });

    it('Should be able to create a user with exits email', async () => { 
        const response = await request(app).post('/users').send({ 
            email: 'user@example.com',
            name: 'User Example',
        });
    
        expect(response.status).toBe(400); 
    });
});