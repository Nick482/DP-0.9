var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/sign_up', function(req, res) {
	res.render('signUp', {title: 'Express'});
});

router.get('/sign_in', function(req, res) {
	res.render('signIn', {title:'Express'})
} );

module.exports = router;