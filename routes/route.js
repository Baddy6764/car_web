const router = require('express').Router()
const adminController = require('../controller/admin');


router.get('/',adminController.homePage)


module.exports=router;