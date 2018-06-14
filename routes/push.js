var JPush = require("../node_modules/jpush-async/lib/JPush/JPushAsync.js")
var database = require('../database')

/*var client = JPush.buildClient('your appKey', 'your masterSecret')*/
var client = JPush.buildClient('1dbf62a1932e3d3c5350f7e6', 'ddf9f7bc9b3c5917884ba1e3');

var newestMsg=-1;

function pushCallBack(code,data,msg){
    if(code==-3){
        console.log("USRerror");
    }
    else if (data.length==0){
        console.log("No Subscribe Usr");
    }
    else{
      /*client.push().setPlatform('ios', 'android')
    .setAudience(JPush.tag('555', '666'), JPush.alias('666,777'))
    .setNotification('Hi, JPush', JPush.ios('ios alert'), JPush.android('android alert', null, 1))
    .setMessage('msg content')
    .setOptions(null, 60)
    .send()
    .then(function(result) {
        console.log(result)
    }).catch(function(err) {
        console.log(err)
    });*/

        data.forEach(elem => {
            console.log("urs"+elem.UserID)
            console.log("msg"+msg)
            client.push().setPlatform('android')
                  .setAudience(JPush.alias(elem.UserID))
                  .setNotification('New Message', null, JPush.android(msg.Brief, msg.SrcID, 1,msg))
                  .setOptions(null, 60)
                  .send()
                  .then(function(result) {
                      console.log(result)
                  }).catch(function(err) {
                      console.log(err)
                  });
        });   
    }
}

function callback(code, data) {
    console.log(data.length);
    if(code==-3){
        console.log("error");
    }
    else if (data.length==0){
        console.log("No New Data");
    }
    else{
        newestMsg=data[0].MsgID;
        data.forEach(elem => {
            database.get_src_usr(elem.SrcID,pushCallBack,elem);
        });   

    }

}

function  checkNewMsg(Interval){
    console.log("In");
    console.log("!!!"+newestMsg);
    database.get_new_msg(newestMsg,callback);
}
var myInterval=setInterval(checkNewMsg,5 * 1000);
/*function  stopInterval(){
    clearTimeout(myInterval);
 //myInterval.unref();
}
setTimeout(stopInterval,5000);*/

/*module.exports = function (userid, data){

	//easy push
	client.push().setPlatform(null,'ios')
    	.setAudience(null,JPush.alias(userid))
    	.setNotification('New Message', null, JPush.android(data[0].brief, data[0].src, 1,data))
    	.setOptions(null, 60)
    	.send()
    	.then(function(result) {
        	console.log(result)
    	}).catch(function(err) {
        	console.log(err)
   		});
}*/

