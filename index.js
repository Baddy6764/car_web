const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

const path = require('path');
const connectDB = require('./db/connect');
app.use(express.static(path.join(__dirname,'public')))

app.use(
    cors({
        origin:"*",
        credentials:true,
    })
);

connectDB()

app.listen(5000, () => {
    console.log("server starts on port 5000")
})