require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const passport= require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongo');
const cors = require('cors');
const User= require("./models/user.js")

const connectDB = require('./db');
const authRoute= require('./route/auth.js');

const port = process.env.PORT || 5000 ;

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

connectDB();

const store = new MongoDBStore({
    mongoUrl: process.env.MONGO_URI,
    secret: process.env.SESSION_SECRET,
    touchAfter: 7*24*60*60
});

store.on('error', function(err){
    console.log("Error!", err);
})

const sessionConfig= {
    store,
    name: 'instruo',
    httpOnly: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + (1000*60*60*24*7),
        maxAge: (1000*60*60*24*7)
    }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

require('./passport.js');

app.use((req, res, next) => {
    if (req.user) {
        res.locals.loggedUser = req.user;
    }
    next();
});


app.use('/api/event', require('./route/event'));
app.use('/api/registrations', require('./route/eventRegistration'));
app.use("/auth", authRoute);

app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
});
