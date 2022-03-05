var express = require('express')
var router = express.Router()
var Comment = require('../models/Comment')
var Article = require('../models/Article')

router.get('/:id/edit', (req,res,next) => {
    var id = req.params.id
    Comment.findById(id, req.body, (err,comment) => {
        if (err) return next(err)
        res.render('updateComment', {comment})
    })
})

router.get('/:id/likes', (req,res,next) => {
    Comment.findByIdAndUpdate(req.params.id, {$inc: {likes: 1}}, (err,comment) => {
        if (err) return next(err)
        res.redirect('/articles/' + comment.articleId)
    })
})

router.get('/:id/dislikes', (req,res,next) => {
    Comment.findByIdAndUpdate(req.params.id, {$inc: {likes: -1}}, (err,comment) => {
        if (err) return next(err)
        res.redirect('/articles/' + comment.articleId)
    })
})

router.post('/:id', (req,res,next) => {
    var id = req.params.id
    Comment.findByIdAndUpdate(id, req.body, (err,comment) => {
        if (err) return next(err)
        res.redirect('/articles/' + comment.articleId)
    })
})

router.get('/:id/delete', (req,res) => {
    var id = req.params.id
    Comment.findByIdAndDelete(id, (err,comment) => {
        if (err) return next(err)
        Article.findByIdAndUpdate(comment.articleId, {$pull: {comments: comment.id}}, (err,article) => {
            if (err) return next(err)
            res.redirect('/articles/' + comment.articleId)
        })
    })
})

module.exports = router