var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlParser = bodyParser.urlencoded({ extended: false });

var database = require('../database')

var bcrypt = require('bcrypt');
const saltRounds = 10;


/*
    {
        "userid": "[userid]",
        "passwd": "[passwd]"
    }
*/
router.post('/SignUp', urlParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }


    var userid = req.body.userid;
    var passwd = req.body.passwd;


   
    function callback(code) {
        switch (code) {
            case 0:
                res.json({
                    "code": 0,
                    "msg": "Succeeded"
                });

                break;
            case -2:
                res.json({
                    "code": -2,
                    "msg": "This userid has been used"
                });
                break;
            case -3:
                res.json({
                    "code": -3,
                    "msg": "Error"
                });
                break;
        }

    };

    database.sign_up(userid, passwd, callback);
});


module.exports = router;