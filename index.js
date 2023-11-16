const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const RateLimit = require("express-rate-limit");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes/route");
const connectDB = require("./db/connect");
const admin = require("./controller/admin");
const session = require("express-session");
const passport = require("passport");
app.set('view engine','ejs')
const multer = require("multer");
const { notFound, errorHandler } = require("./utils/errorHandler");
app.use(express.static(path.join(__dirname, "public")));
const Users = require("./modal/users");

let limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max:100,
})

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  session({
    secret:process.env.MY_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {},
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(limiter)
app.use(routes);

connectDB();
app.use(notFound);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log("server starts on port 5000");
});
