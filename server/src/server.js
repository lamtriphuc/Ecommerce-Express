const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
const app = express();


// Middleware


// Run
app.get('/', (req, res) => {
    res.send('ok')
})

app.listen(port, () => {
    console.log('Run at Port', port)
})
