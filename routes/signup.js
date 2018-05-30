var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var bcrypt = require('bcrypt');
const saltRounds = 10;


/*
    {
        "userid": "[userid]",
        "passwd": "[passwd]"
    }
*/
router.post('/login', jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);

    var userid = req.body.userid;
    var passwd = req.body.passwd;

    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        
      });
    
      
    // verify 
});


module.exports = router;