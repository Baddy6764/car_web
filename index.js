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
const { notFound, errorHandler } = require("./utils/errorHandler");
app.use(express.static(path.join(__dirname, "public")));
const Users = require("./modal/users");
require("dotenv").config()
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  session({
    secret:'my secret',
    resave:false,
    saveUninitialized:false,
    cookie:{}
  })
)



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);



app.use(passport.session());
app.use(passport.initialize());
connectDB();
app.use(notFound);
app.use(errorHandler);
app.listen(5000, () => {
  console.log("server starts on port 5000");
});
