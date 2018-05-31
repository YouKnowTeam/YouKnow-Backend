var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlParser = bodyParser.urlencoded({ extended: false });

var database = require('../database')

var bcrypt = require('bcrypt');
const saltRounds = 10;

const secret = 'jwtTokenSecret';


/*
    {
        "userid": "[userid]",
        "passwd": "[passwd]"
    }
*/
router.post('/GetAllSubscribedMessages', urlParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }


    var token = req.body.token;
    var msgid = req.body.msg_id;
    var num = req.body.num;

    var decoded = jwt.decode(token, secret);

    if (decoded.exp <= Date.now() || decoded.aud !== 'jser') {
        res.json({
            "code": -1,
            "msg": "Invalid token",
            "data": []
        });
    }

    var userid = decoded.iss;
    

    function callback(code, data) {
        switch (code) {
            case 0:
                res.json({
                    "code": 0,
                    "msg": "Succeeded",
                    "data": JSON.stringify(data)
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


    database.get_all_subscribed_msg(userid, msgid, num, callback);
});


module.exports = router;