const express = require('express');
const { dbConnection } = require('./database/config')
require('dotenv').config();

const port = process.env.PORT;

//create express server
const app = express();

//DB
dbConnection();

//Parse requests json body
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
//Transferencias
//Destinatarios

//Listen requests
app.listen(port, () => {
    console.log(`Server running on port ${ port }`);
})