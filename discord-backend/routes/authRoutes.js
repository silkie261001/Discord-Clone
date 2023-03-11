const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth/authControllers');
//validate if correct data has been sent or not
const Joi = require('joi'); // schema description language and data validator for js
const validator = require('express-joi-validation').createValidator({});
const auth = require('../middleware/auth');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});
router.post(
  '/register',
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);
router.post(
  '/login',
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

//test route to verify if our middleware is working

router.get('/test', auth, (req, res) => {
  res.send('request passed');
});
module.exports = router;
