var express = require('express');
var router = express.Router();
const path = require('path');
let Blogs = require('../model/index')('Blogs');

router.get('/list',async function (req,res) {
    let blogList = await Blogs.REQUEST();
    let temp = blogList.map(async function (blog) {
       blog.authorized = await Blogs.IsUserInBlog(req.user.email, blog.name);
       console.log(blog);
       return blog;
    });
    res.json(await Promise.all(temp));
});

router.post('/data', async function(req,res) {
   if(req.isAuthenticated() && await Blogs.IsUserInBlog(req.user.email,req.body.room)) {
       res.json(await Blogs.GetByName(req.body.room));
   }
   else {res.json(false);}
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

router.post('/sendJoinReq', async function(req,res) {
   if(req.isAuthenticated()) {
       Blogs.JoinReq(req.body.room,req.user.email);
       res.json(true);
   }
   else {res.json(false);}
});

module.exports = router;