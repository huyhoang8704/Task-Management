import express , {Express, Request , Response} from 'express';
import dotenv from 'dotenv';
import * as database from './config/database';
import mainV1Routes from './api/v1/routes/index.route'


const app : Express  = express()
const port : number | string = process.env.PORT || 3000;

dotenv.config();
database.connect();


mainV1Routes(app);
 

app.listen(port , () =>{
    console.log(`App listening on port ${port}`);
})