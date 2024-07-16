const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const database = require('./config/database')
require('dotenv').config()

const RoutesAPIVer1 = require('./api/v1/routes/index.route')

const app = express()
const port = process.env.PORT;

// bodyParser API
app.use(bodyParser.json())
// CORS
app.use(cors())

// Connect DB
database.connect();
// Connect Route

RoutesAPIVer1(app);




app.listen(port , () =>{
    console.log(`App listening on port ${port}`);
})