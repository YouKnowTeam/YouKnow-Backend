/*
 * Input: SrcID
 * Output: Array of the userIDs who subscribed to the message sources
 */
var bcrypt = require('bcrypt');

module.exports = function (srcid, callback, msg) {

    var conn = require('./db_conn')();

    var sql;
    
    sql = "SELECT UserID FROM UserSrc WHERE SrcID=?";
        

    conn.query(sql, [srcid], function (err, result) {
        var code = 0;
        if (err) {
            console.log(err.message);
            code = -3;
        }
        conn.end();
        console.log("usr"+result);
        callback(code, result, msg);
    });

};
