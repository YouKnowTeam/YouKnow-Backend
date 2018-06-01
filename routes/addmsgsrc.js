var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var bodyParser = require('body-parser');
var urlParser = bodyParser.urlencoded({ extended: false });
const secret = 'jwtTokenSecret';
var database = require('../database')

// /login?userid=[userid]&passwd=[passwd]
router.post('/SubscribeMessageSource', urlParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    var token = req.body.token;
    var srcid= req.body.source_id;
    console.log("srcid:" + srcid);
    console.log("Token:"+token+typeof(token));

    // Retrieve derived password with respect to the userid
    
    var decoded = jwt.decode(token, secret);
    if (decoded.exp <= Date.now() || decoded.aud !== 'jser') {
        res.json({
            "code": -1,
            "msg": "Invalid token"
        });
    }
    var userid = decoded.iss;
    console.log("userid:" + userid);



    function callback(code) {
        switch (code) {
            case 0:
                res.json({
                    "code": 0,
                    "msg": "Succeeded"
                });
                break;
            
            case -3:
                res.json({
                    "code": -3,
                    "msg": "Inner error"
                });
                break;

        }
    }
    database.add_msgscr(userid, srcid, callback);
});


module.exports = router;