var express = require('express');
var router = express.Router();
const path = require('path');
let Blogs = require('../model/index')('Blogs');

router.get('/list',async function (req,res) {
    res.json(await Blogs.REQUEST());
});


module.exports = router;