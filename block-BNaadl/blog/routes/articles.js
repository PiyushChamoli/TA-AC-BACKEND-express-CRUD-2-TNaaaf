var express = require('express')
var router = express.Router()
var Article = require('../models/Article')

// list articles
router.get('/', (req,res) => {
    Article.find({}, (err, allArticles) => {
        if (err) return next(err)
        res.render('allArticles', {articles: allArticles})
    })
})

// create article form
router.get('/new', (req,res) => {
    res.render('addArticle')
})

//fetch single article
router.get('/:id', (req,res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) next(err)
        res.render('singleArticle', {article})
    })
})

// create article
router.post('/', (req,res,next) => {
    req.body.tags = req.body.tags.trim().split(' ')
    Article.create(req.body, (err, createdArticle) => {
        if (err) return next(err)
        res.redirect('/articles')
    })

})

// edit article form
router.get('/:id/edit', (req,res) => {
    var id = req.params.id
    Article.findById(id, (err,article) => {
        article.tags = article.tags.join(' ')
        if (err) return next(err)
        res.render('editArticleForm', {article})
    })
})

// increment likes
router.get('/:id/likes', (req,res,next) => {
    var id = req.params.id
    Article.findByIdAndUpdate(id, {$inc: {likes:1}}, (err,article) => {
        if (err) return next(err)
        res.redirect('/articles/'+ id)
    })
})

// decrement likes
router.get('/:id/dislikes', (req, res, next) => {
    var id = req.params.id;
  
    Article.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, data) => {
      if (err) return next(err);
      res.redirect('/articles/' + id);
    });
  });

// update article 
router.post('/:id', (req,res,next) => {
    var id = req.params.id
    req.body.tags = req.body.tags.split(' ')
    Article.findByIdAndUpdate(id, req.body, (err, updatedUser) => {
        if (err) return next(err)
        res.redirect('/articles/' + id)
    })
})

// delete article
router.get('/:id/delete', (req,res,next) => {
    Article.findByIdAndDelete(req.params.id, (err, deletedArticle) => {
        if (err) return next(err)
        res.redirect('/articles')
    })
})

module.exports = router