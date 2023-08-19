// const express = require('express')
// const Sequelize = require('./db/connect')
// const session = require('express-session')
// const flash = require('connect-flash')
// const app = express()
// const Session = require('./modal/sessions')
// const sequelize = require('sequelize')
// const Users = require('./modal/users');
// const SequelizeStore = require('connect-session-sequelize')(session.Store)
// app.use(flash())
// app.use(session({
//     secret:'my secret',
//     resave:false,
//     saveUninitialized:false,
//     store:new SequelizeStore({
//         db:Sequelize
//     }),
//     cookie:{}
// }))
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({extended:true}))
// app.set('view engine','ejs')
// const router = require('./routes/route')
// app.use((req,res,next)=>{
//     res.locals.isLoggedIn = req.session.isLoggedIn;
//     res.locals.user = req.session.user,
//     next()
// })
// const path = require('path')
// app.use(express.static(path.join(__dirname,'public')))




// app.use(router)
// Sequelize.sync()
// .then(conn =>{
// app.listen(7000)
// console.log("Sever runing in port:7000/")
// }).catch(erro =>{
//     console.log(erro)
// })