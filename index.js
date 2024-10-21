require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const app = express();

const port = process.env.PORT || 8000

connectDB();

app.use(express.json());

app.use('/api/event', require('./route/event'));

app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
});