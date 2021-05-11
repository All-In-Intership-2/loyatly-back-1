const express = require('express');
const { register } = require('../controllers/company');
const { Auth } = require('../middleware/auth');

const companyRouter = express.Router();

companyRouter.post('/register', Auth, register);

module.exports = companyRouter;