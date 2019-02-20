const express = require('express');

const db = require('../helpers/postDb.js');
const postRouter =  express.Router();

//Get
postRouter.get('/', (req, res) => {
    db.get()
    .then(posts => {
        res.status(200).json({ success: true, posts });
    })
    .catch(err => {
        res.status(500).json({ success: false, error : 'There post information could not be retrieved'})
    })
})

// GET by id
postRouter.get('/:id', (req, res) => {
    const {id} = req.params;

    db.getById(id)
    .then(posts => {
        if (posts) {
            res.status(201).json({success: true , posts});
        } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({  error: "The post information could not be retrieved."})
    })
})





module.exports = postRouter;