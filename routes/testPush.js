var JPush = require("../node_modules/jpush-async/lib/JPush/JPushAsync.js")
var client = JPush.buildClient('5013c7344b787a461276da92', 'bd4aef85608b5791c8574359')

//easy push
client.push().setPlatform(JPush.ALL)
    .setAudience(JPush.ALL)
    .setNotification('Hi, JPush', null, JPush.ios('ios alert', 'happy', 5))
    .send()
    .then(function(result) {
        console.log(result)
    }).catch(function(err) {
        console.log(err)
    })