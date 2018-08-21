//this file is responsible for all the request for books
var express = require('express');
var router = express.Router();
const path = require('path');
let books = require('../model/index')('Books');

//for file uploading
const multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
//        let p = path.join(__dirname,'..','..','BookStore','dist','BookStore','assets','images','books');
        let p = path.join(__dirname,'..','public','books','images');
        cb(null,p);
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname + ".jpg");
    }
});
let upload = multer({storage:storage});


/* GET ALL books*/
router.post('/list', async function (req, res ,next) {
    try {
        res.json(await books.REQUEST(req.body.skip,req.body.limit));
    }
    catch (e) {res.send(e)}
});

router.get('/myUnsold', async function(req,res) {
   books.AllUserUnsold(req.user.email,function (err,doc) {
       if(err) {
           console.log(err);
           res.json([]);
       }
       else {res.json(doc);}
   });
});

router.get('/mySells', function (req,res) {
    books.AllUserSells(req.user.email,function (err,doc) {
        if(err) {
            console.log(err);
            res.json([]);
        }
        else {res.json(doc);}
    });
});

router.post('/create',upload.single('photo'), function(req, res, next) {
   console.log(req.file);
   if(req.isAuthenticated())
   {
       books.CREATE(req.user.email,req.body.bookName,req.body.bookAuthor,req.body.bookISBN,
           req.body.bookSeries,req.body.bookPublishDate,req.body.bookSummary,
           req.body.bookPrice,req.file.originalname, function (err) {
               if(err) {res.json("couldn't upload your file, try diffrent name or ISBN");}
               else {res.json(true);}
           });
   }
   else {res.json("user must be connected");}
});


module.exports = router;