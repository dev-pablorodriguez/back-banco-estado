const express = require('express');
require('dotenv').config();

const port = process.env.PORT;

//create express server
const app = express();

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