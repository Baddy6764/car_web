const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes/route");
const connectDB = require("./db/connect");
const admin = require("./controller/admin");
const session = require('express-session');
const passport = require('passport');
const multer = require("multer");
const { notFound, errorHandler } = require("./utils/errorHandler");
app.use(express.static(path.join(__dirname, "public")));
const Users = require("./modal/users");
require("dotenv").config();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

let Store = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, 'public/images')
  },
   filename: (req, files, cb) =>{
    cb(null, Date.now() + "-" + "pic" + files.originalname);
   }
})

const multStorage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, "public/videos")
  },
  filename:(req, file, cb)=>{
    cb(null, Date.now() + file.originalname);
  }
})

const uploadImage = multer({storage : Store}).fields ([{name: 'images', maxCount:8},])

const uploadVideo = multer({storage:multStorage}).fields([{name: 'videos', maxCount:2}])

app.use(uploadImage)
app.use(uploadVideo)

app.use(
  session({
    secret:'my secret',
    resave:false,
    saveUninitialized:false,
    cookie:{}
  })
)


app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);




connectDB();
app.use(notFound);
app.use(errorHandler);
app.listen(5000, () => {
  console.log("server starts on port 5000");
});
