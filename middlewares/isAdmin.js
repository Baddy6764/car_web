
const jwt = require("jsonwebtoken");

module.exports=(req,res,next)=>{
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).json({error:"Authentication required"})
    }
    jwt.verify(token,'112345',(err,user)=>{
        if(err){
            return res.status(403).json({error:"Forbidden"})
        }
        if(user.role !== true){
            return res.status(403).json({error:"Admin access required"})
        }
        req.user=user;
        next();
    })
}









// function authicatedToken(req,res,next){
//     const token = req.header('Authization');
//  if (!token){
//     res.status(400)
//     return new Error ("Authenticaion required")
// }
// jwt.verify(token, '112345', (err,))
// }


// const checkJWT = auth({
//     audience:'{/private-api}',
//     issuerBaseURL:`http://localhost:5000/private-api`
// });


// router.get('/public-api',(req,res)=>{
//     res.send("This route is public");
// })
// const checkScopes = requiredScopes('read:messages');

// router.get('/private-api/-scooped',checkJWT,checkScopes,(req,res)=>{
//     res.json({
//         message:'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
//     });
   
// })