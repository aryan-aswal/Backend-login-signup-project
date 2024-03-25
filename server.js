const express = require('express');
const { dbConnect } = require('./config/database');
const { router } = require('./routes/routes');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/v1/', router);

const PORT = process.env.PORT;

app.listen(`${PORT}`, ()=> {
    console.log("Server started successfully");
})

dbConnect();