//this file is responsible for all the request for books
var express = require('express');
var router = express.Router();
let books = require('../../model/Book');

/* GET ALL books*/
router.get('/list', function (req, res ,next) {
    try {
        res.json(books.REQUEST());
    }
    catch (e) {res.send(e)}
});

module.exports = router;