const express = require('express');
const path = require('path');
const router = express.Router();

router.get(/.*/, async (req, res) => {
    res.sendFile('index.html', { root: path.join(appRoot, 'BookStore', 'dist', 'BookStore')});
});

module.exports = router;