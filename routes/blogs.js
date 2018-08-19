var express = require('express');
var router = express.Router();
const path = require('path');
let Blogs = require('../model/index')('Blogs');

router.get('/list',async function (req,res) {
    res.json(await Blogs.REQUEST());
});

router.post('/doILike',async function (req,res) {
    if(req.isAuthenticated()) {
        res.json(await Blogs.DoILikeBlog(req.user.email,req.body.room));
    }
    else {res.json(false);}
});

router.post('/addUser', async function(req,res) {
   if(req.isAuthenticated() && await Blogs.IsCreator(req.user.email, req.body.room)) {
       Blogs.ADDUSER(req.body.user, req.body.room);
       res.json(true);
   }
   else {res.json(false);}
});

router.post('/isCreator', async function(req ,res) {
   res.json(await Blogs.IsCreator(req.user.email, req.body.room));
});

module.exports = router;