var fs = require('fs');
var express = require('express');
var app = express();
var https = require('https');



var loginRouter = require('./routes/login')
var signupRouter = require('./routes/signup')


app.get('/', function (req, res) {  
    res.send('Hello World!');
});

app.use('/', loginRouter)
app.use('/', signupRouter)


var httpsOptions = {
    key: fs.readFileSync('./encryptions/key.pem'),
    cert: fs.readFileSync('./encryptions/cert.crt')
};

var server = https.createServer(httpsOptions, app).listen(3000, function(){

});  