const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const path = require("path");
const connectDB = require("./db/connect");
const { notFound, errorHandler } = require("./utils/errorHandler");
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(route);
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();
app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("server starts on port 5000");
});
