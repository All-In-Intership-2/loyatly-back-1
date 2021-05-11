const express = require('express');
const { login, register } = require('../controllers/auth');

const authRouter = express.Router();

// login
authRouter.post('/login', login);
// register
authRouter.post('/registration/init', register.init);
authRouter.post('/registration/finish', register.finish);

module.exports = authRouter;