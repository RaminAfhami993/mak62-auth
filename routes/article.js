const express = require('express');
const article = require('../models/article');
const router = express.Router();
const Article = require('../models/article')

router.get('/', (req, res) => {
    res.json({route: "article route"})
});


router.post('/create', (req, res) => {
    if (!req.body.title || !req.body.text || !req.body.authorId) {
        return res.status(406).json({msg: 'Not Acceptable'});
    };

    const NEW_ARTICLE = new Article({
        text: req.body.text,
        title: req.body.title,
        author: req.body.authorId
    });

    NEW_ARTICLE.save((err, savedArticle) => {
        if (err) {
            return res.status(500).json({msg: "Somthing went wrong"})
        };

        res.json(savedArticle)
    })
})


router.get('/all', (req, res) => {
    Article.find({}).populate('author', {_id: 0, username: 1, firstName: 1}).exec((err, articles) => {
        if (err) {
            return res.status(500).json({msg: "Somthing went wrong"})
        };

        res.json(articles)
    })
})


router.get('/:userId', (req, res) => {
    Article.find({author: req.params.userId}, (err, articles) => {
        if (err) {
            return res.status(500).json({msg: "Somthing went wrong"})
        };

        res.json(articles)
    })
})




module.exports = router;