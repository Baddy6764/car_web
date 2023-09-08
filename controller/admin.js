const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const dataJson = require("../Data/data.json");

exports.datajson = (req,res)=>{
res.status(200).json({data:dataJson})
}

passport.use(
    new GoogleStrategy(
        {
           clientID:"829754950475-dtkr2j0bf0sn1htrcmjs4arhmbo9jnfn.apps.googleusercontent.com",
           clientSecret:"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",
            
        }
    )
)