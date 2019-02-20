const express = require('express');

const helmet = require('helmet') // security 

const userRouter = require('./helpers/user-router');

const server = express();

//Middleware
server.use(express.json());
server.use(helmet());

//User middleware
server.use('/api/users', userRouter);

//test get 
server.get('/'), (req, res) => {
    res.send(`
    <h2>Node-Blog</h2>
    
  `);
}

module.exports = server;