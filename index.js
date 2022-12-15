const express = require('express');

//create express server
const app = express();

//Routes
app.get('/', (req, res) => {
    res.json({ ok: true })
})

//Listen requests
app.listen(3000, () => {
    console.log(`Server running on port ${ 3000 }`);
})