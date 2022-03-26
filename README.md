# JSON-express-router
NPM module allowing to use json objects as expressJS router. it also includes Jsonwebtoken to secure  routes or to specify a particular User Role.

## Installation

    npm i JSON-express-router

## Utilisation
  Use the router.js file to define your route ,and the role authorized for access.

    // router.js
    const someController = require('someController');
    const someMiddleware = require('someMiddleware');
    const router =
    [
        {
            path:'/login',
            method:'POST',
            role:[],
            secure:false,
            middleware:[someMiddleware],
            controller: (req,res)=>{
                    res.status(200).json('login succesfuly')
            }
        },
        {
            path:'/hello',
            method:'GET',
            role:['ROLE_USER','ROLE_ADMIN'],
            middleware:[],
            controller:someController
        } 
    ]
    module.exports = router;

  - path: the route path.
  - method: the http method.
  - role: (_array of string_) List of the user Role who can access to this route.
  - secure(_optional_): _boolean_ use this when you do not use Role, but the route must be secured by jsonwebtoken.
  - middleware: (_array of function_) List of the middleware.
  - controller: controller of the route.
    

    //app.js

    const express = require('express');
    const app = express();
    const server = require('http').createServer(app)
    
     const _router = require('./router')
     const Router = require('JSON-express-router');

    // Server port
    let port = 3000;

    // Launch server listening to request
    server.listen(port, function () {
    console.log('Server listening at port %d', port);
    });
    
    Router.router(app,_router);

## Methods

- router(_app,_router): the router fonction, _app is the express app and _router is the route list.
  

- verify(err,req, res, next,role): auth fonction for verify jwt, you must passed err,req,res object and the next fonction to use this fonction, role is the role of the user connected is a optional parameter but you must use it when the routes is authorized for a specific role.


- jwToken(req,res,payload,privateKey,option): payload,privateKey,option for create the jwt, the function send automaticaly the token.


