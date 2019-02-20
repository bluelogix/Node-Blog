const express = require('express');

const helmet = require('helmet') // security 

//import User-router
const userRouter = require('./helpers/user-router');
//import Post-router
const postRouter = require('./helpers/post-router');

const server = express();

//Middleware
server.use(express.json());
server.use(helmet());
//User middleware
server.use('/api/users',  userRouter);
//Posts middleware
server.use('/api/posts', postRouter);




//test get 
server.get('/'), (req, res) => {
    res.send(`
    <h2>Node-Blog</h2>
    
  `);
}

//Custom middleware
function only(name) {
    return function(req, res, next) {
        const nameChange = req.params.name 
        if( nameChange.toUpperCase() === name.toUpperCase()) {
            next(); 
        } else {
            res.status(403).json('Name cannot be changed!')
        } 
    }
}
module.exports = server;