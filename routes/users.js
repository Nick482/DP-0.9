var express = require('express');
var router = express.Router();
var $ = require('jquery');
var User = require('../models').User;
var GenerateUp = require('../web/src/components/common/random/GenerateUp.js');
var GenerateIn = require('../web/src/components/common/random/GenerateIn.js');
var Sequelize = require('sequelize');



/* GET users listing. */
router.get('/', function(req, res) {
});


router.post('/new', function(req, res) {
    User.find({where: Sequelize.or({email: req.body.email}, {login: req.body.login}) }).then(function(user) {
        if (!user) {
            User.create(req.body).then(function (user) {
                res.status(255).send(user);
            })
        }
        else {
            if (user.email == req.body.email && user.login == req.body.login) {
                res.status(258).send(user.email)
            }
            if (user.login == req.body.login && user.email !== req.body.email) {
                res.status(256).send("Specified username is taken")
            }
            if (user.email == req.body.email && user.login !== req.body.login) {
                res.status(257).send("E-mail " + user.email + " has already been registered")
            }
        }
    })
    });



router.post('/pics', function(req, res) {
    User.update(
        {
            picSequence : req.body.picSequence
        },
        {
            where: {id : req.body.id}
        })
        .then(function(){
            res.status(261).send(console.log(req.body.id + " also " + req.body.picSequence));
        }
    );
});

router.post('/generateUp', function(req, res) {
    User.find({where: {id: req.body.id} }).then(function (user) {
        GenerateUp(user);
        var rString = GenerateUp.rString;
        console.log(user.verified);
        user.update({randLink: rString});
        console.log(user.randLink);
        res.send(user.email);
    })
});

router.get('/verifyUp' , function(req, res){
    User.find({where: {randLink: req.query.link} }).then(function (user) {
        user.verified = true;
        user.save();
        res.send(console.log(user.id + " " + user.verified + " " + user.login));
        res.send(console.log("Smashing Success!!!"))
    });
});

router.post('/check', function(req, res) {
    User.find({where: {login: req.body.login} }).then(function(user){
        if(user){
            if(user.password !== req.body.password) {
                res.status(259).end();
            }else{
                res.status(255).send(user);
            }
        }else {
            res.status(260).send(user.login);
        }
    });

});

router.post('/picCheck', function(req, res){
    User.find({where: {id: req.body.id} }).then(function(user){
        if(user.picSequence !== req.body.picSequence){
            res.status(262).send(user.login)
        }
        else {
            res.status(261).send(user)
        }
    })
});

router.post('/generateIn', function(req, res){
    User.find({where: {id: req.body.id} }).then(function (user) {
        GenerateIn(user);
        var rString = GenerateIn.rString;
        user.update({randLink: rString});
        res.send(user.email)
    })
});

router.get('/verifyIn', function(req, res) {
    User.find({where: {randLink: req.query.link} }).then(function (user) {
       user.verified = true;
       user.save();
        res.send(console.log(user.id + " " + user.verified + " " + user.login));
        res.send(console.log("Smashing Success!!!"))
    });
});


module.exports = router;