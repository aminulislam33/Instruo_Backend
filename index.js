require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
// const passport= require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongo');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const authRoute= require('./route/auth.js');
const userRoute= require('./route/user.js');

const port = process.env.PORT || 5000 ;

const allowedOrigins = ['https://admin.instruo.tech', 'https://instruo.tech', 'https://registration-form-instruo.vercel.app', 'https://register.instruo.tech'];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            const error = new Error('Not allowed by CORS');
            console.log(error);
            callback(error);
        }
    },
    credentials: true,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

connectDB();

app.use((req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.error('Invalid token');
        }
    }
    next();
});

app.use('/api/event', require('./route/event'));
app.use('/api/registrations', require('./route/eventRegistration'));
// app.use("/auth", authRoute);
app.use('/api/v1/auth/', authRoute);
app.use("/user", userRoute);

app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
});