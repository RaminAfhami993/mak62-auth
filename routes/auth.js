const express = require('express');
const router = express.Router();
const User = require('../models/user') 

router.get('/registerPage', (req, res) => {
    res.render('register')
});

router.get('/loginPage', (req, res) => {
    res.render('login')
});



router.post('/register', (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
        return res.status(406).json({msg: 'Not Acceptable'});
    };

    const NEW_USER = new User({
        username: req.body.username,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        password: req.body.password
    });


    NEW_USER.save((err, user) => {
        if (err) {
            return res.status(500).json({msg: "Somthing went wrong"})
        };

        res.json(user)
    });
    
})

module.exports = router;