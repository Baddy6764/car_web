const Users = require('../../modal/users');
const bcrypt = require('bcrypt');
const session = require('../../modal/sessions');
const {validationResult} = require('express-validator');

// exports.registerPage = (req,res)=>{
//     let errMsg = req.flash('validationErr')
//     console.log(errMsg)
//     res.render('index.ejs',{title:"Register",Displayerros:errMsg})
// }

exports.register = (req,res) =>{  
    let erro = validationResult(req);
    if(!erro.isEmpty()){
         req.flash('validationErr',erro.array())
        //  res.render('index',{modalOpen:true,title:"Home",DisplayErros:erro.array()})
        return res.render('/')
    }  

const {firstName,lastName,Email,Password,} = req.body;
bcrypt.hash(Password,13).then(hashed =>{
    Users.create({
        firstname:firstName,
        lastname:lastName,
        email:Email,
        password:hashed
    }).then(save =>{
        // res.render('index',{modalOpen:true,title:"Home",DisplayErros:erro.array()})
        // return 
       return res.redirect('/')
    }).catch(err =>{
        console.log(err)
    })
})
}

exports.loginPage = (req,res)=>{
    res.render('/')
}

exports.login = (req,res) =>{
 const {Email, Password} = req.body;
 Users.findOne({where:{
    email:Email
 }}).then(user =>{
    if(!user){
      return  res.redirect('/')
    }
    bcrypt.compare(Password,user.password).then(result =>{
        if(!result){
            return  res.redirect('/')
        }
        req.session.isLoggedIn=true;
        req.session.data=user;
        req.session.save(()=>{
            res.redirect('/');
        })

    }).catch(err =>{
        console.log(err)
    })
 })   
}