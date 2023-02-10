import express, { type Express } from 'express';
import dotenv from 'dotenv';
import setupRoutes from './ServerRoutes/serverRoutes';
import db from './Controllers/dataBaseController';
dotenv.config();

const PATH_TO_STATIC_FILES: string = './client/build/';
const app: Express = express();
const port: string = process.env.PORT ?? '3001';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PATH_TO_STATIC_FILES));
setupRoutes(app);
db.Start().then().catch(e => console.error);
app.listen(port, () => {
  console.log('I am live on port:' + port);
});
