//this file is responsible for all the request for books
var express = require('express');
var router = express.Router();
let books = require('../../model/Book');

/* GET ALL books*/
router.get('/list', function (req, res ,next) {
    try {
        res.json(books.REQUEST());
        console.log(books.REQUEST());
    }
    catch (e) {res.send(e)}
});

// router.post('/create', function (req, res ,next) {
//     let bookToaAdd = new book
//         {
//             this.name = req.body.name,
//             this.author = req.body.author,
//             this.seriesName = req.body.seriesName,
//             this.publishDate = req.body.publishDate,
//             this.ISBN = req.body.ISBN,
//             this.summary = req.body.summary,
//             this.seller = req.body.seller,
//             this.sellDate = new Date(),//just fo now we should put it null? or min value on date
//             this.created_at = new Date(),
//             this.updated_at = new Date
//         };
//     try {
//         res.json(books.CREATE(bookToaAdd));
//     }
//     catch (e) {res.send(e)}
// });

//just for check if work
router.get('/create', function (req, res ,next) {
    let bookToaAdd = new book
        {
            this.name = "a",
            this.author = "req.body.author",
            this.seriesName = "4",
            this.publishDate = new Date(),
            this.ISBN = "req.body.ISBN",
            this.summary = "req.body.summary",
            this.seller = "req.body.seller",
            this.sellDate = new Date(),//just fo now we should put it null? or min value on date
            this.created_at = new Date(),
            this.updated_at = new Date
        };
    console.log('book created');
    try {
        res.json(books.CREATE(bookToaAdd));
    }
    catch (e) {res.send(e)}
});
module.exports = router;