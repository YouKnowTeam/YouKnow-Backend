var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlParser = bodyParser.urlencoded({ extended: false });
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var secret = 'jwtTokenSecret';
var database = require('../database');
const saltRounds = 10;


router.get('/GetAllMessageSource', urlParser, function(req, res){
    var token = req.query.token;
    console.log("Token:"+token+typeof(token))
    var decoded = jwt.decode(token, secret);
    if (decoded.exp <= Date.now() || decoded.aud !== 'jser') {
        res.json({
            "code": -1,
            "msg": "Invalid token",
            "data": []
        });
    }
    var userid = decoded.iss;
    console.log("userid:" + userid);

    function callback(code, data) {
        switch (code) {
            case 0:
                res.json({
                    "code": 0,
                    "msg": "Succeeded",
                    "data": data
                });
                break;
            
            case -3:
                res.json({
                    "code": -3,
                    "msg": "Inner error",
                    "data": []
                });
                break;

        }
    }


    database.get_msgsrcs(userid, callback);
    
});




module.exports = router;