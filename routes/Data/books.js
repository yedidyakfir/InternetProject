//this file is responsible for all the request for books
var express = require('express');
var router = express.Router();
const path = require('path');
let books = require('../../model')('Books');

//for file uploading
const multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let p = path.join(__dirname,'..','..','BookStore','dist','BookStore','assets','images','books');
        cb(null,p);
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname + ".jpg");
    }
});
let upload = multer({storage:storage});


/* GET ALL books*/
router.get('/list', async function (req, res ,next) {
    try {
        res.json(await books.REQUEST());
    }
    catch (e) {res.send(e)}
});

//create a new book
// router.get('/create', async function (req, res ,next) {
//     let bookToaAdd = {
//             name : "StormLight2",
//             author : "req.body.author",
//             seriesName : "4",
//             publishDate : new Date(),
//             ISBN : 3456,
//             summary : "req.body.summary",
//             seller : "req.body.seller",
//             sellDate : new Date(),//just fo now we should put it null? or min value on date
//             created_at : new Date(),
//             updated_at : new Date(),
//             photo : "",
//             active : true,
//             price : 15
//         };
//     console.log('book created');
//     try {
//         books.CREATE(bookToaAdd);
//     }
//     catch (e) {res.send(e)}
// });

router.post('/create',upload.single('photo'), function(req, res, next) {
   console.log(req.file);
   if(req.isAuthenticated())
   {
       books.CREATE(req.user.email,req.body.bookName,req.body.bookAuthor,req.body.bookISBN,
           req.body.bookSeries,req.body.bookPublishDate,req.body.bookSummary,
           req.body.bookPrice,req.file.originalname);
       res.json(true);
   }
   else {res.json("user must be connected");}
});

module.exports = router;