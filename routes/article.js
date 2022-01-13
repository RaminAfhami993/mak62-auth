const express = require('express');
const router = express.Router();
const Article = require('../models/article')

router.get('/', (req, res) => {
    res.json({route: "article route"})
});


router.post('/create', (req, res) => {
    if (!req.body.title || !req.body.text) {
        return res.status(406).json({msg: 'Not Acceptable'});
    };

    const NEW_ARTICLE = new Article({
        text: req.body.text,
        title: req.body.title
    });

    NEW_ARTICLE.save((err, savedArticle) => {
        if (err) {
            return res.status(500).json({msg: "Somthing went wrong"})
        };

        res.json(savedArticle)
    })
})

module.exports = router;