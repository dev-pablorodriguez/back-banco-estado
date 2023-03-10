const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT;

//create express server
const app = express();

//DB
dbConnection();

//Cors
app.use(cors());

//Parse requests json body
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transferencias', require('./routes/transferencias'));
app.use('/api/destinatarios', require('./routes/destinatarios'));
app.use('/api/banks', require('./routes/banks'));

//Listen requests
app.listen(port, () => {
    console.log(`Server running on port ${ port }`);
})