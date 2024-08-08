import express , {Express, Request , Response} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as database from './config/database';
import mainV1Routes from './api/v1/routes/index.route'


const app : Express  = express()
const port : number | string = process.env.PORT || 3000;

dotenv.config();
database.connect();

// bodyParser API
app.use(bodyParser.json())

mainV1Routes(app);
 

app.listen(port , () =>{
    console.log(`App listening on port ${port}`);
})