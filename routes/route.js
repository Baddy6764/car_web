const router = require('express').Router()
const { check } = require('express-validator');
const adminController = require('../controller/admin');
const authen = require('../controller/auth/authen');


router.get('/',adminController.homePage);

router.post('/register-Page',[
check('firstName').notEmpty().withMessage('Field must not be blank').ltrim().withMessage("please remove the whitespace").rtrim().withMessage('please remove whitespace'),
check('lastName').notEmpty().withMessage('Field must not be blank').ltrim().withMessage("please remove the whitespace").rtrim().withMessage('please remove whitespace'),
check('Email').notEmpty().withMessage('Field must not blank').isEmail().withMessage('Invalid Email').ltrim().withMessage('please remove the whitespace').rtrim().withMessage('please remove the whitespace'),
check('Password').notEmpty().withMessage('Field cannot be blank').isLength({min:6}).withMessage('Pass word must not less than 6 character').contains('$@_-').withMessage('contain any character $@_-'),
check('confirmPassword').notEmpty().withMessage('Field cannot be blank').custom((value,{req})=>{
    if(value !== req.body.password){
        throw new Error('Password not match')
    }
    return true
})

],authen.register);

// router.get('/register-Page',authen.registerPage);

router.get('/login-page',authen.loginPage);
router.post('/login-page',[
    check('Email').notEmpty().withMessage('Field must not blank').isEmail().withMessage('Invalid Email').ltrim().withMessage('please remove the whitespace').rtrim().withMessage('please remove the whitespace'),
    check('Password').notEmpty().withMessage('Field cannot be blank').isLength({min:6}).withMessage('Pass word must not less than 6 character').contains('$@_-').withMessage('contain any character $@_-'),
    check('confirmPassword').notEmpty().withMessage('Field cannot be blank').custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error('Password not match')
        }
        return true
    })
],authen.login);
module.exports=router;