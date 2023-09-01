const router = require("express").Router();
const { check } = require("express-validator");
const adminController = require("../controller/admin");
const authen = require("../controller/auth/authen");
// const isAuth = require('../middlewares/isAuth');
// const isAdmin = require('../middlewares/isAdmin');

router.post("/register-page", authen.register);

router.post("/activation", authen.activation);

router.post("/login-page", authen.login);







// router.get("/thisigup",(req,res)=>{
//     res.send("Sign up")
// })
// router.get("/this",isAdmin,(req,res)=>{
//     res.send("ghdsvdsvsdvhdfvhfvhfdkhfd")
// })

// router.get('/forgot-password',authen.forgotPassword);





module.exports = router;
