var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var database = require('../database');

// /login?userid=[userid]&passwd=[passwd]
router.post('/login', jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);

    var userid = req.body.userid;
    var passwd = req.body.passwd;

    // result is an integer which represents return code
    result = database.sign_in(userid, passwd);

    // process according to the return code
    switch(result) {
        case 0:
            // if success
            break;
        case -1:
            // if password incorrect
            break;
        case -2:
            // if user ID does not exist
            break;
        case -3:
            // if internal error
    }
});


module.exports = router;
