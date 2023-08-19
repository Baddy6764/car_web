// const {validationResult} = require('express-validator');

exports.homePage = (req,res)=>{
    let errMsg = req.flash('validationErr')
        console.log(errMsg)
        res.render('index.ejs',{title:"Home",DisplayErros:errMsg,modalOpen:true})
}