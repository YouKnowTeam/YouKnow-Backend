var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const database = require('./database')

var bcrypt = require('bcrypt');
const saltRounds = 10;


/*
    {
        "userid": "[userid]",
        "passwd": "[passwd]"
    }
*/
router.post('/SignUp', jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);

    var userid = req.body.userid;
    var passwd = req.body.passwd;
    var result=database.sign_up(userid, passwd)
    if (result==true){
            res.json({
                "code": 0,
                "msg": "Succeeded"
            });
        }
        else if (result==0){
            res.json({
                "code": -2,
                "msg": "This userid has been used"
            });
        }
        else{
            res.json({
                "code": -3,
                "msg": "Error"
            });
        } 
    
});


module.exports = router;