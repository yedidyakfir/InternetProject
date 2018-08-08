//this file is responsible for all the request for books
var express = require('express');
var router = express.Router();
let books = require('../../model')('Books');

/* GET ALL books*/
router.get('/list', async function (req, res ,next) {
    try {
        res.json(await books.REQUEST());
    }
    catch (e) {res.send(e)}
});

//create a new book
router.get('/create', async function (req, res ,next) {
    let bookToaAdd = {
            name : "StormLight2",
            author : "req.body.author",
            seriesName : "4",
            publishDate : new Date(),
            ISBN : 3456,
            summary : "req.body.summary",
            seller : "req.body.seller",
            sellDate : new Date(),//just fo now we should put it null? or min value on date
            created_at : new Date(),
            updated_at : new Date(),
            photo : "",
            active : true,
            price : 15
        };
    console.log('book created');
    try {
        books.CREATE(bookToaAdd);
    }
    catch (e) {res.send(e)}
});
module.exports = router;