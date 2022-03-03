var express = require('express')
var router = express.Router()
var Article = require('../models/Article')

router.get('/', (req,res) => {
    Article.find({}, (err, allArticles) => {
        if (err) return next(err)
        res.render('allArticles', {articles: allArticles})
    })
})

router.get('/:id', (req,res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) next(err)
        res.render('singleArticle', {article})
    })
})

module.exports = router