const express = require('express');

const db = require('../helpers/userDb.js');
const router =  express.Router();

//Get
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

// Get Users Post by id
router.get('/:id/posts', (req, res) => {
    const {id} = req.params;

    db.getUserPosts(id)
    .then(user=> {
        if (user) {
            res.status(201).json({success: true , user});
        } else {
        res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({  error: "The user information could not be retrieved."})
    })
})


// Post 
router.post('/', (req, res) => {
   const { name } = req.body;
   
    if (!name) {
        res.status(400).json({errorMessage: 'Please provide name for the user'});
    } else {
        db.insert({ name })
        .then(user => {
        res.status(201).json( user );
    })
    .catch(err  => {
        res.status(500).json({ 
             error: 'There was an error while saving the user to the database'
            });
        })
    }
});

// Delete 
router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.
    remove(id)
    .then(user => {
        if (user) {
            res.status(204).end();
        } else {
            res.status(404).json({ success: false, message: "The user with the specified ID does not exist." });
        }
    })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed" })  
    })
})

// Put 
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
    .then(userUpdate => {
        if( !userUpdate) {
            res.status(404).json({ success: false, message: 'The user with the specified ID does not exist.' })
        } else if ( !changes.name ) {
            return res.status(400).json({  success: false, errorMessage: 'Please provide name for the user.' })

        } else {
            return res.status(200).json({ success: true, changes })
        }
    })
    .catch(err => {
        res.status(500).json({  success: false, error: 'The user information could not be modified'})
    })
})




module.exports = router;