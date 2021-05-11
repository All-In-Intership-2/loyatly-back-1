require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// db connection
const { connect } = require('./models/Database');

// routes
const authRouter = require('./routes/auth');
const companyRouter = require('./routes/company');

// constants
const { SERVER_HOST, SERVER_PORT } = process.env;

// app
const app = express();
// middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/auth', authRouter);
app.use('/company', companyRouter);

const run = async () => {
  try {
    await connect();
    console.log('Successfully connected to db.');
  } catch (err) {
    throw new Error(err);
  }
  app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is listening on ${SERVER_HOST}, on port: ${SERVER_PORT}`);
  });
};

run();