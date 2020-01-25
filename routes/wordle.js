var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("hi");
	var base64 = req.app.get('base64');
  res.render('wordle', { 
  	title: 'Express', 
  	base64: base64
  });
});

module.exports = router;