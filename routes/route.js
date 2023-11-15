const router = require("express").Router();
const adminController = require("../controller/admin");
const authen = require("../controller/auth/authen");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");
const upload = require("../utils/multer");

////Register Route
router.post("/register-page", authen.register);

/////Register-Activation Route
router.post("/activation", authen.activation);

////Login Route
router.post("/login-page", authen.login);

////Forgot Password Route
router.post("/forget-password", isAuth, authen.forgetPassword);

////Retrive Password Route
router.post("/retrive-password", isAuth, authen.retrivePassword);

///Update Cars Route
router.post("/update-cars", isAuth, adminController.updateCars);

////Update Password Route
router.post("/update-password", isAuth, authen.updatePassword);

///car_data Route
router.post("/cars/data", isAuth, adminController.datajson);

////Authentication wuith google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://gart-racing.netlify.app",
  }),
  authen.googleCallback
);

/////////Auth_Google Route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  authen.googleAuth
);

////Register Cars Route
router.post(
  "/register/car",
  isAuth,
  upload.fields([
    { name: "images", maxCount: 2 },
    { name: "video", maxCount: 1 },
  ]),
  adminController.Registercars
);

/////Adminroute
router.post("/admin-dashboard", isAuth, isAdmin, adminController.adminDasboard);

//////approvecar route
router.post("/approve/cars", isAuth, isAdmin, adminController.approveCar);

//////deletecar route
router.post("delete/cars", isAuth, isAdmin, adminController.deleteCar);

//////rejectcar route
router.post("/reject/cars", isAuth, isAdmin, adminController.rejectCar);

module.exports = router;
