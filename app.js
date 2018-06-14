var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http');
var https = require('https');

var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var getallsubscribedmsgRouter = require('./routes/getallsubscribedmsg');
var getallMsgSrcRouter = require('./routes/getallmsgsrc');
var subcribeMsgSrcRouter = require('./routes/addmsgsrc');
var unsubcribeMsgSrcRouter = require('./routes/rmmsgsrc');
var getMessageDetails = require('./routes/getMessageDetails')

app.get('/', function (req, res) {  
    res.send('Hello World!');
});

app.use('/', loginRouter);
app.use('/', signupRouter);
app.use('/', getallsubscribedmsgRouter);
app.use('/', getallMsgSrcRouter);
app.use('/', subcribeMsgSrcRouter);
app.use('/', unsubcribeMsgSrcRouter);
app.use('/', getMessageDetails);


var httpsOptions = {
    key: fs.readFileSync('./encryptions/key.pem'),
    cert: fs.readFileSync('./encryptions/cert.crt')
};

var server = https.createServer(httpsOptions, app).listen(3000, function(){


});  

var serverHTTP = http.createServer(app).listen(4000, function(){

});