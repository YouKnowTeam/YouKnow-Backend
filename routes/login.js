var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var bcrypt = require('bcrypt');
const saltRounds = 10;

// /login?userid=[userid]&passwd=[passwd]
router.post('/login', jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
    
    var userid = req.body.userid;
    var passwd = req.body.passwd;

    // Retrieve derived password with respect to the userid

    bcrypt.compare(passwd, hash, function(err, result) {
        if(result){ 
            // Verification succeeded
            res.send();

        }
        else{
            // Verification failed
            res.send();

        }

        // res == false
    });


    // verify 
});


module.exports = router;