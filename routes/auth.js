const express = require('express');
const router = express.Router();
const User = require('../models/user') 

router.get('/registerPage', (req, res) => {
    res.render('register', {msg: null})
});

router.get('/loginPage', (req, res) => {
    res.render('login', {msg: null})
});



router.post('/register', (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
        // return res.status(406).json({msg: 'Not Acceptable'});
        return res.render('register', {msg: 'Not Acceptable'})
    };

    if (req.body.password.length > 50 || req.body.password.length < 8) {
        // return res.status(406).json({msg: 'Not Acceptable'});
        return res.render('register', {msg: 'Not Acceptable'})

    };


    User.findOne({username: req.body.username.trim()}, (err, existUser) => {
        if (err) {
            // return res.status(500).json({msg: "Somthing went wrong"})
            return res.render('register', {msg: 'Somthing went wrong'})

        };

        if (existUser) {
            // return res.status(406).json({msg: "username already token"})
            return res.render('register', {msg: 'username already token'})

        };

        const NEW_USER = new User({
            username: req.body.username,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            password: req.body.password
        });
    
    
        NEW_USER.save((err, user) => {
            if (err) {
                // return res.status(500).json({msg: "Somthing went wrong"})
                return res.render('register', {msg: 'Somthing went wrong'})

            };
    
            res.render('login', {msg: null})
        });
    })
});


router.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        // return res.status(406).json({msg: 'Not Acceptable'});
        return res.render('login', {msg: 'Not Acceptable'})
    };


    User.findOne({username: req.body.username, password: req.body.password}, (err, user) => {
        if (err) {
            return res.render('login', {msg: 'Somthing went wrong'})
        } 
        if (!user) {
            return res.render('login', {msg: 'Wrong username or password'})
        }

        res.render('dashboard', user)

    })
})

module.exports = router;