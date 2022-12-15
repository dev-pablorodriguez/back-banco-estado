const express = require('express');
require('dotenv').config();

const port = process.env.PORT;

//create express server
const app = express();

//Routes
app.get('/', (req, res) => {
    res.json({ ok: true })
})

//Listen requests
app.listen(port, () => {
    console.log(`Server running on port ${ port }`);
})