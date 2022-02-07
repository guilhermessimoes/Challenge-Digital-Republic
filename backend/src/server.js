const express = require('express');
const cors = require('cors');
const session = require('express-session');
const authRouter = require('./routes/authRoute');
const accountRoutes = require('./routes/accountRoute');

require('dotenv').config();

const app = express();
const defaultPort = 8080;
const port = process.env.PORT || defaultPort;

app.use(cors());
app.use(express.json());

const miliseconds = 1000;
const seconds = 60;

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: miliseconds * seconds * seconds },
    })
);

app.use(authRouter);
app.use('/account', accountRoutes);

app.listen(port, () => console.log('Server is running'));
