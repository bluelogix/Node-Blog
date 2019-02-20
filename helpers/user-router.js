const express = require('express');

const db = require('../helpers/userDb.js');
const router =  express.Router();

router.get('/', (req, res) => {
    db.get()
    .then(users=> {
        res.status(200).json({ success: true, users });
    })
    .catch(err => {
        res.status(500).json({ success: false, error : 'There user information could not be retrieved'})
    })
})

// GET by id
router.get('/:id', (req, res) => {
    const {id} = req.params;

    db.getById(id)
    .then(posts=> {
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



module.exports = router;