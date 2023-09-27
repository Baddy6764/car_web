const router = require("express").Router()
const adminController = require("../controller/admin");
const authen = require("../controller/auth/authen");
const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const multer = require("multer")



/////Using Multer to store Images/Videos
let Store = multer.diskStorage({
  ///Folder_destination  
  destination:(req,file,cb)=>{
    cb(null, 'public/images')
  },
  ////Files_name
   filename: (req, files, cb) =>{
    cb(null, Date.now() + "_"  + files.originalname);
   }
})

/////Multer Storage
const upload = multer({storage:Store})

////Register Route
router.post("/register-page",authen.register);

/////Register-Activation Route
router.post("/activation", authen.activation);

////Login Route
router.post("/login-page", authen.login);

////Forgot Password Route
router.post('/forget-password',authen.forgetPassword);

////Retrive Password Route
router.post('/retrive-password',authen.retrivePassword);

///Update Cars Route
router.post('/update-cars',adminController.updateCars);

////Update Password Route
router.post('/update-password',authen.updatePassword);

///car_data Route
router.post("/cars/data",adminController.datajson);


////Authentication wuith google
router.get("/google/callback",passport.authenticate('google',{failureRedirect:"https://gart-racing.netlify.app"}),authen.googleCallback)


/////////Auth_Google Route
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}),authen.googleAuth);

////Register Cars Route
router.post('/register/car',adminController.Registercars);

// router.get('/uploads',(req,res)=>{
//     res.send(
//    `
//    <form action="/upload/cars" enctype="multipart/form-data" method="post">
//     <input type="file" name="images" multiple><br>
//     <input type="file" name="videos" multiple><br>
//     <button type="submit">Upload</button>
// </form>
//     `)
// })



module.exports = router;
