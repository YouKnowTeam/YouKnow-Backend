var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var secret = 'jwtTokenSecret';
var database = require('../database');
const saltRounds = 10;


router.get('/GetAllMessageSource', function(req, res){
    var token = req.query.token;
    
})