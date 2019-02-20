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
    .then(users=> {
        if (users) {
            res.status(201).json({success: true , users});
        } else {
        res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({  error: "The user information could not be retrieved."})
    })
})



module.exports = router;