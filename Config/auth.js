// auth.js
var mongoose = require('mongoose');  
var User = require('../DBA/schemas.js').User;  
var service = require('./service');

exports.signup = function(req, res) {
    var username = req.body.username, password=req.body.password; 
    var user = new User({
        username: username,
        password: password
    });

    user.save(function(err){
        return res
            .status(200)
            .send({token: service.createToken(user)});
    });
};

exports.login = function(req, res) {  
    var username = req.body.username, password=req.body.password;   
    User.findOne({username: username}, function(err, user) {
        if (err) res.status(403).send('User doesnt exist');
        else{
        return res
            .status(200)
            .send({token: service.createToken(user)});}
    });
};