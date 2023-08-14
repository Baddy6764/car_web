const express = require('express')
const Sequelize = require('./db/connect')
const app = express()
const sequelize = require('sequelize')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
const router = require('./routes/route')
const path = require('path')
app.use(express.static(path.join(__dirname,'public')))





app.use(router)
Sequelize.sync()
.then(conn =>{
app.listen(7000)
console.log("Sever runing in port:7000/")
}).catch(erro =>{
    console.log(erro)
})