const router = require('express').Router()
const { check } = require('express-validator');
const adminController = require('../controller/admin');
const authen = require('../controller/auth/authen');

// router.get('/',adminController.homePage);

// router.get('/register-page',authen.registerPage);

router.post('/register-page',authen.register);

// router.get('/login-page',authen.loginPage);

// router.post('/login-page',authen.login);



module.exports=router;