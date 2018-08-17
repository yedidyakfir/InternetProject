var express = require('express');
var router = express.Router();
const path = require('path');
let Blogs = require('../model/index')('Blogs');

router.get('/list',async function (req,res) {
    res.json(await Blogs.REQUEST());
});

router.post('doILike', function (req,res) {
   res.json(false);
});


module.exports = router;