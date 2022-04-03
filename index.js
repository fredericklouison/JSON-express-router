const jwt = require('jsonwebtoken');
const loop =(err,req,res,next,route)=>{
    if(route.role.length || route.secure){
        auth.verify(err,req,res,next,route.role);
    }
    route.middleware.forEach(middleware=>{  middleware(req,res,next)})
    next()
}
const router = (_app,_router)=>{
    _router.forEach((route)=>{
        switch (route.method){
            case "GET":
                _app.get(route.path,(err,req,res,next)=>{
                    loop(err,req,res,next,route);
                },route.controller)
                break;
            case "POST":
                _app.post(route.path,(err,req,res,next)=>{
                    loop(err,req,res,next,route);
                },route.controller)
                break;
            case "PUT":
                _app.put(route.path,(err,req,res,next)=>{
                    loop(err,req,res,next,route);
                },route.controller)
                break;
            case "DELETE":
                _app.delete(route.path,(err,req,res,next)=>{
                    loop(err,req,res,next,route);
                },route.controller)
                break;
        }
    })
}
const verify = (err,req, res, next,role) => {

    const token =req.headers.authorization? req.headers.authorization.split(' ')[1] : null;
    const decodedToken =token? jwt.verify(token, process.env.JWT_SECRET_KEY) : 0;

    if((role && role.includes(decodedToken.role)||(decodedToken && !role.length))) {
        req.token = {...decodedToken};
        next();
    }
    else {
        res.status(401).json('Invalid request!')
    }

};
const jwToken = (req,res,payload,privateKey,option)=>{
    jwt.sign(payload, privateKey, option, function(err, token) {
        if (err){
            console.log(err)
        }
        res.status('200').json({token})
    });
}



module.exports = {verify,jwToken,router}
