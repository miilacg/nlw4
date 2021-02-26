import 'reflect-metadata'; //é importante ele sempre vir primeiro
import express from 'express'; //o express ajuda a criar um servidor
import createConnection from "./database";
import { router } from './routes';

createConnection();
const app = express();

app.use(express.json());
app.use(router);

export { app };