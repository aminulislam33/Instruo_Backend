require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const passport= require('passport');
const session = require('express-session');
const cors = require('cors');

const connectDB = require('./db');
const authRoute= require('./route/auth.js');
require('./passport.js');

const port = process.env.PORT || 8000 ;

app.use(express.json());
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 7 days
}));

app.use((req, res, next)=>{
    res.locals.loggedUser= req.user;
    next();
});

app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use('/api/event', require('./route/event'));
app.use('/api/registrations', require('./route/eventRegistration'));
app.use("/auth", authRoute);
app.use('/', require('./route/user'));

app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
});