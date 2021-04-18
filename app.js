require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// constants
const { SERVER_HOST, SERVER_PORT } = process.env;
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

// app
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server is listening on ${SERVER_HOST}, on port: ${SERVER_PORT}`);
});