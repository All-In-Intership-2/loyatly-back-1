const express = require('express');
const { register } = require('../controllers/company');

const companyRouter = express.Router();

companyRouter.post('/register', register);

module.exports = companyRouter;