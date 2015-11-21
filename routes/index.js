var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DevHacks 2015 - Unkown Hackers' });
});

module.exports = router;
