import 'reflect-metadata'; //é importante ele sempre vir primeiro
import express from 'express'; //o express ajuda a criar um servidor
import "./database";
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);


/*porta*/
app.listen(3333, () => console.log('Server is running!'));