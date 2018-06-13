var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlParser = bodyParser.urlencoded({ extended: false });
var database = require('../database')
var bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jwt-simple');
const secret = 'jwtTokenSecret';

/*
    {
        "userid": "[userid]",
        "passwd": "[passwd]"
    }
*/
router.get('/GetMessageDetail', urlParser, function (req, res) {


    var token = req.query.token;
    console.log("Token:"+token+typeof(token))
    var msgid = req.query.msg_id;
    console.log("msgid:"+msgid+typeof(msgid))

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

            case -2:
                res.json({
                    "code": -2,
                    "msg": "This message does not exist",
                    "data": []
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


    database.get_msg_detail(userid, msgid, callback);
});


module.exports = router;
