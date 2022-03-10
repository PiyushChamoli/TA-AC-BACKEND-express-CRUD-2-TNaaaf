var express = require('express')
var router = express.Router()
var Book = require('../models/Book')
var Author = require('../models/Author')

router.get('/', (req,res) => {
    Book.find({}).populate('author').exec((err,result) => {
        if (err) return next(err)
        res.render('listBooks', {result})
    })
})



module.exports = router