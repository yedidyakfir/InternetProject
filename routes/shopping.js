//this file is for all request of buy and sell
var express = require('express');
var router = express.Router();
const path = require('path');
let Books = require('../model/index')('Books');
let Users = require('../model/index')('Users');

router.post('/addToCart', async function (req,res) {
    if(req.isAuthenticated()) {
        let book = await Books.REQUESTBY({name:req.body.book.name,ISBN:req.body.book.ISBN});
        Users.AddToCart(book._id, req.user._id, function (err,doc) {
            console.log(doc);
            if (err) {
                console.log(err);
                res.json("cant add to cart");
            }
            else {
                res.json(true);
            }
        });
    }
    else {res.json("you must be logged in to add to cart");}
    console.log(req.user);
});

router.post('/removeFromCart', async function (req,res) {
    if(req.isAuthenticated()) {
        let book = await Books.REQUESTBY({name:req.body.book.name,ISBN:req.body.book.ISBN});
        Users.RemoveFromCart(book._id, req.user._id, function (err) {
            if (err) {
                console.log(err);
                res.json("cant add to cart");
            }
            else {
                res.json(true);
            }
        });
    }
    else {res.json("you must be logged in to add to cart");}
    console.log(req.user);
});

router.get('/list', async function (req,res) {
    if(req.isAuthenticated()) {
        console.log(req.user.cartItems);
        Books.GetByIDs(req.user.cartItems,function (err, doc) {
            if (err) {
                console.log(err);
                res.json("cant get this cart");
            }
            else {
                res.json(doc);
            }
        });
    }
    else {res.json("you must be logged in to add to cart");}
});

module.exports = router;