var JPush = require("jpush-async")
var client = JPush.buildClient('your appKey', 'your masterSecret')

module.exports = function (userid, data){
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
}

