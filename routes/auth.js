const express = require('express');
const router = express.Router();

router.get('/registerPage', (req, res) => {
    res.render('register')
});

router.get('/loginPage', (req, res) => {
    res.render('login')
})

module.exports = router;